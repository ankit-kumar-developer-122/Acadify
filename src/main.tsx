import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './ui/App'
import './ui/styles.css'
import './ui/teacher.css'
import './ui/themes.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
