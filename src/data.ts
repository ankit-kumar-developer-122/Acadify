import type { Resource, Tutor } from './types'
import catalog from './data/catalog.json'

export const tutors = catalog.tutors as Tutor[]

export const resources: Resource[] = [
  { id: 'r1', title: 'The Visual Guide to Mechanics', creator: 'Ananya Sharma', type: 'Study notes', subject: 'Physics', price: 149, rating: 4.9, color: 'resource-lilac', icon: '✳', description: 'A beautifully illustrated guide to kinematics, forces, and motion. Made for curious minds who want to see the big picture.' },
  { id: 'r2', title: 'Python in 30 Days', creator: 'Rohan Mehta', type: 'Mini course', subject: 'Python', price: 399, rating: 4.8, color: 'resource-peach', icon: '⌘', description: 'Build a confident coding habit with one small, practical project every day. No experience needed.' },
  { id: 'r5', title: 'Java Foundations: Your First App', creator: 'Rohan Mehta', type: 'Mini course', subject: 'Java', price: 349, rating: 4.7, color: 'resource-sky', icon: 'J', description: 'A beginner-friendly path through Java basics, simple classes, and a small command-line project. Synthetic demo resource.' },
  { id: 'r3', title: 'Speak Up: Interview Edition', creator: 'Priya Nair', type: 'Practice pack', subject: 'English', price: 99, rating: 5.0, color: 'resource-mint', icon: '✦', description: 'Thoughtful prompts and example answers to help you tell your story clearly and confidently.' },
  { id: 'r4', title: 'Calculus, Made Visual', creator: 'Arjun Kapoor', type: 'Study notes', subject: 'Mathematics', price: 199, rating: 4.9, color: 'resource-sky', icon: '∫', description: 'A friendly visual companion to limits, derivatives, and integrals, with worked examples.' },
]

export const subjects = ['All subjects', 'Physics', 'Mathematics', 'Coding', 'Python', 'Java', 'Spoken English']
