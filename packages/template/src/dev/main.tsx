/// <reference types="vite/client" />
import '../styles/main.css'

import { Toast } from '@heroui/react'
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
      <Toast.Provider placement='top' />
      <App />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
