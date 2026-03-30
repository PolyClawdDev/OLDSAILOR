import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  console.info(
    '[Old Sailor] Dev: always use ONE address, e.g. http://localhost:3000 — not 127.0.0.1 in one browser and localhost in another (separate Chrome cache). If UI looks old: Chrome → DevTools → Network → ☑ Disable cache, then hard refresh.',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
