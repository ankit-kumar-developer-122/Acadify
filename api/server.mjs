import express from 'express'
import { DatabaseSync } from 'node:sqlite'
import { spawn, execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, mkdir, access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = resolve(root, '.data')
await mkdir(dataDir, { recursive: true })
const db = new DatabaseSync(resolve(dataDir, 'acadify-demo.sqlite'))
db.exec(`PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS demo_bookings (
  id TEXT PRIMARY KEY, tutor_id TEXT NOT NULL, subject TEXT NOT NULL,
  session_date TEXT NOT NULL, session_time TEXT NOT NULL, mode TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Requested','Confirmed','Declined','Completed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS demo_events (
  id INTEGER PRIMARY KEY, event_type TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)
const app = express()
app.use(express.json({ limit: '16kb' }))
app.use((req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })
const python = process.env.PYTHON ?? 'python3'
const java = process.env.JAVA ?? 'java'
const run = promisify(execFile)

async function jsonFromProcess(command, args, value) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] })
    let stdout = ''; let stderr = ''
    child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk })
    child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolveResult(JSON.parse(stdout)) : reject(new Error(stderr || `${command} exited ${code}`)))
    child.stdin.end(JSON.stringify(value))
  })
}

function textFromProcess(command, args, input) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] })
    let stdout = ''; let stderr = ''
    child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk })
    child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolveResult(stdout) : reject(new Error(stderr || `${command} exited ${code}`)))
    child.stdin.end(input)
  })
}

app.get('/api/health', async (_req, res) => {
  const integrations = { api: 'ready', sqlite: 'ready', python: 'unknown', scikitLearn: 'unknown', java: 'unknown' }
  try { await run(python, ['-c', 'import sklearn']); integrations.python = 'ready'; integrations.scikitLearn = 'ready' } catch { integrations.python = 'needs setup'; integrations.scikitLearn = 'needs setup' }
  try { await run(java, ['-version']); integrations.java = 'ready' } catch { integrations.java = 'needs setup' }
  res.json({ status: 'ok', demoDataOnly: true, integrations })
})

app.get('/api/tutors', async (_req, res) => {
  const catalog = JSON.parse(await readFile(resolve(root, 'src/data/catalog.json'), 'utf8'))
  res.json({ tutors: catalog.tutors, source: 'synthetic-catalog' })
})

app.post('/api/match', async (req, res) => {
  const { subject, mode = 'Online or in-person', goal = '' } = req.body ?? {}
  if (typeof subject !== 'string' || subject.length > 80 || typeof goal !== 'string' || goal.length > 300 || !['Online', 'Online or in-person', 'In-person'].includes(mode)) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Choose a subject and supported learning mode.' })
  try {
    const catalog = JSON.parse(await readFile(resolve(root, 'src/data/catalog.json'), 'utf8'))
    const result = await jsonFromProcess(python, ['services/python/match.py'], { tutors: catalog.tutors, subject, mode, goal })
    res.json({ ...result, source: 'local-python-demo' })
  } catch { res.status(503).json({ code: 'MATCHER_UNAVAILABLE', message: 'The local Python matcher is not set up yet.' }) }
})

app.post('/api/requests/prioritize', async (req, res) => {
  const items = req.body?.requests
  if (!Array.isArray(items) || items.length > 100 || items.some(item => !item || typeof item.id !== 'string' || !['urgent', 'standard', 'flexible'].includes(item.priority))) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Provide up to 100 requests with an id and supported priority.' })
  try {
    const source = resolve(root, 'services/java/BookingPriorityQueue.java')
    const classFile = resolve(dataDir, 'BookingPriorityQueue.class')
    try { await access(classFile) } catch { await run('javac', ['-d', dataDir, source]) }
    const input = items.map(item => `${item.priority}\t${item.id}`).join('\n')
    const stdout = await textFromProcess(java, ['-cp', dataDir, 'BookingPriorityQueue'], input)
    res.json({ orderedIds: stdout.trim() ? stdout.trim().split('\n') : [], source: 'local-java-priority-queue' })
  } catch { res.status(503).json({ code: 'RANKER_UNAVAILABLE', message: 'The local Java request ranker is not available.' }) }
})

app.post('/api/bookings', (req, res) => {
  const b = req.body ?? {}
  if (!['tutorId', 'subject', 'date', 'time', 'mode'].every(key => typeof b[key] === 'string' && b[key].length > 0 && b[key].length <= 120)) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Booking fields are incomplete.' })
  const booking = { id: `api-${crypto.randomUUID()}`, tutorId: b.tutorId, subject: b.subject, date: b.date, time: b.time, mode: b.mode, status: 'Requested' }
  db.prepare('INSERT INTO demo_bookings (id,tutor_id,subject,session_date,session_time,mode,status) VALUES (?,?,?,?,?,?,?)').run(booking.id, booking.tutorId, booking.subject, booking.date, booking.time, booking.mode, booking.status)
  db.prepare('INSERT INTO demo_events (event_type) VALUES (?)').run('booking_requested')
  res.status(201).json({ booking, persistence: 'local-sqlite-demo' })
})

app.get('/api/metrics', (_req, res) => {
  const bookings = db.prepare('SELECT status, COUNT(*) AS total FROM demo_bookings GROUP BY status').all()
  const events = db.prepare('SELECT event_type, COUNT(*) AS total FROM demo_events GROUP BY event_type').all()
  res.json({ bookings, events, source: 'synthetic-local-sqlite' })
})

const port = Number(process.env.API_PORT || 4174)
app.listen(port, '127.0.0.1', () => console.log(`Acadify demo API listening on http://127.0.0.1:${port}`))
