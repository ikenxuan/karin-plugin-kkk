import './styles/index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { scan } from 'react-scan'

import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'

if (import.meta.env.MODE === 'development') {
  if (typeof window !== 'undefined') {
    scan({
      log: false,
    })
  }
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter basename='/kkk/'>
    <Toaster />
    <App />
  </BrowserRouter>
  // </StrictMode>,
)
