import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
    'src/dev/index.ts',
  ],
  format: ['esm'],
  target: 'node18',
  clean: true,
  dts: true,
  sourcemap: false,
  external: [
    'react',
    'react-dom',
    'vite',
    'esbuild',
    '@tailwindcss/vite',
    '@vitejs/plugin-react',
    'framer-motion',
    'lucide-react',
    '@heroui/react',
    '@heroui/theme',
    '@heroui/system'
  ],
})
