import React from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import { App } from './App'
import './index.css'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <HeroUIProvider>
        <App inspectorActive={false} onInspectorToggle={() => { }} />
      </HeroUIProvider>
    </React.StrictMode>
  )
} else {
  console.error('Root element not found')
}
