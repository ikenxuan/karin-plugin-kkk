/// <reference types="vite/client" />
import '../styles/main.css'

import { ToastProvider } from '@heroui/react'
import React, { useState } from 'react'
import { Inspector } from 'react-dev-inspector'
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
  const [inspectorActive, setInspectorActive] = useState(false)

  return (
    <React.StrictMode>
      <ToastProvider placement='top-center' />
      <Inspector
        keys={['control', 'shift', 'alt', 'c']}
        active={inspectorActive}
        onActiveChange={setInspectorActive}
      />
      <App
        inspectorActive={inspectorActive}
        onInspectorToggle={setInspectorActive}
      />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
