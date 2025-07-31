import './styles/index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
  <Toaster />
  <App />
  </>
  // </StrictMode>,
)
