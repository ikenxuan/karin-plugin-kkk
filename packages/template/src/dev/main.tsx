/// <reference types="vite/client" />
import '../styles/main.css'

import { ToastProvider } from '@heroui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'

import { App } from './App'

if (import.meta.env.MODE === 'development') {
  if (typeof window !== 'undefined') {
    scan({
      log: false
    })
  }
}
const Root = () => {
  return (
    <React.StrictMode>
      <ToastProvider placement='top-center' />
      <App />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
