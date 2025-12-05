#!/usr/bin/env node
import { cac } from 'cac'
import pc from 'picocolors'
import { consola } from 'consola'
import { version } from '../package.json'
import { resolveConfig } from './config/loader'
import { startDevServer } from './dev/server'
// import { build } from './build'

const cli = cac('kkt')

cli
  .command('dev', 'Start development server')
  .option('--port <port>', 'Port to listen on')
  .option('--host [host]', 'Host to listen on')
  .option('--open', 'Open browser on start')
  .action(async (options) => {
    try {
      const root = process.cwd()
      const config = await resolveConfig(root, {
        dev: {
          port: options.port,
          host: options.host,
          open: options.open,
        }
      }, true)

      await startDevServer(config)
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })

cli
  .command('build', 'Build templates for production')
  .option('--outDir <dir>', 'Output directory', { default: 'dist' })
  .action(async (options) => {
    try {
      const root = process.cwd()
      const config = await resolveConfig(root, {
        build: {
          outDir: options.outDir,
        }
      }, false)

      consola.info('Building templates...')
      // await build(config)
      consola.warn('Build command is not implemented yet')
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })

cli.help()
cli.version(version)

cli.parse()
