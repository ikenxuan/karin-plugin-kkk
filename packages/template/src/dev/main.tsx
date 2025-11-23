import '../styles/main.css'

import { ToastProvider } from '@heroui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastProvider
      placement='top-center'
    />
    <App />
  </>
)
