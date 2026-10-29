import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const processes = [
  spawn(process.execPath, ['api/server.mjs'], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js'], { cwd: root, stdio: 'inherit' }),
]
let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of processes) child.kill('SIGTERM')
  process.exitCode = code
}
for (const child of processes) child.on('exit', code => { if (!stopping && code !== 0) stop(code || 1) })
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
