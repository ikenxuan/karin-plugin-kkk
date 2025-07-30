import './styles/index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Toaster from '@/components/toaster'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
  <Toaster />
  <App />
  </>
  // </StrictMode>,
)
