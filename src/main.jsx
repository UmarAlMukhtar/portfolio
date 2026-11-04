import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

// Replace the static page before revealing the loader to prevent a content flash.
flushSync(() => {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
container.removeAttribute('data-prerendered')
