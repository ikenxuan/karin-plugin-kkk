import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const entryFile = resolve(__dirname, '../lib/index.js')

describe('Entry File', () => {
  it('should load lib/index.js without throwing errors', async () => {
    const result = await new Promise<{ code: number | null, error?: string }>((resolve) => {
      const child = spawn(process.execPath, [entryFile], {
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 10000
      })

      let stderr = ''
      child.stderr?.on('data', (data) => {
        stderr += data.toString()
      })

      const killTimer = setTimeout(() => {
        child.kill('SIGKILL')
      }, 2000)

      child.on('error', (err) => {
        clearTimeout(killTimer)
        resolve({ code: 1, error: err.message })
      })

      child.on('exit', (code, signal) => {
        clearTimeout(killTimer)
        if (signal === 'SIGKILL') {
          resolve({ code: 0, error: stderr || undefined })
        } else {
          resolve({ code, error: stderr || undefined })
        }
      })
    })

    expect(result.code, result.error).toBe(0)
  }, 10000)
})
