import { useState } from 'react'
import type { Booking, Resource } from './types'

const KEY = 'acadify-demo-v1'
type State = {
  bookings: Booking[]; purchased: string[]; messages: { text: string; mine: boolean }[];
  teacherResources: Resource[]; availability: Record<string, boolean>; availabilityWindow: { start: string; end: string }
}
const seed: State = {
  bookings: [
    { id: 'b1', tutorId: '1', subject: 'Physics · Rotational motion', date: 'Today', time: '5:00 PM', mode: 'Online', status: 'Confirmed', learner: 'Ankit Kumar' },
    { id: 'b2', tutorId: '1', subject: 'Physics · Work & energy', date: 'Tomorrow', time: '10:00 AM', mode: 'Online', status: 'Requested', learner: 'Ira M.' },
    { id: 'b3', tutorId: '1', subject: 'Mathematics · Functions', date: 'Saturday', time: '12:30 PM', mode: 'In-person', status: 'Requested', learner: 'Dev K.' },
  ], purchased: [], messages: [{ text: 'Hi Ananya! I’m finding rotational motion a little tricky.', mine: true }, { text: 'Hey! Totally understandable. Let’s build it up from what you already know. 😊', mine: false }],
  teacherResources: [], availability: { Mon: true, Tue: true, Wed: false, Thu: true, Fri: true, Sat: true, Sun: false }, availabilityWindow: { start: '16:00', end: '20:00' },
}
function read(): State { try { const saved = localStorage.getItem(KEY); if (!saved) return seed; const parsed = JSON.parse(saved); return { ...seed, ...parsed, availabilityWindow: { ...seed.availabilityWindow, ...parsed.availabilityWindow }, bookings: (parsed.bookings || seed.bookings).map((b: Booking) => ({ ...b, learner: b.learner || 'Ankit Kumar' })) } } catch { return seed } }
export function useDemoStore() {
  const [state, setState] = useState<State>(read)
  const update = (change: (current: State) => State) => { setState(current => { const next = change(current); try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* local demo remains usable when storage is unavailable */ } return next }) }
  return {
    ...state,
    addBooking: (booking: Booking) => update(current => ({ ...current, bookings: [booking, ...current.bookings] })),
    updateBooking: (id: string, status: Booking['status']) => update(current => ({ ...current, bookings: current.bookings.map(b => b.id === id ? { ...b, status } : b) })),
    buy: (id: string) => update(current => ({ ...current, purchased: current.purchased.includes(id) ? current.purchased : [...current.purchased, id] })),
    send: (text: string) => update(current => ({ ...current, messages: [...current.messages, { text, mine: true }] })),
    setAvailability: (availability: Record<string, boolean>, availabilityWindow: State['availabilityWindow']) => update(current => ({ ...current, availability, availabilityWindow })),
    publishResource: (resource: Resource) => update(current => ({ ...current, teacherResources: [resource, ...current.teacherResources] })),
  }
}
