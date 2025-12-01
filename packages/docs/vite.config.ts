import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config';

// add other Fumadocs deps as needed
const FumadocsDeps = ['fumadocs-core', 'fumadocs-ui']
const SSRNoExternal: (string | RegExp)[] = [/^@lobehub\/.*/]

export default defineConfig({
  plugins: [
    mdx(MdxConfig),
    tailwindcss() as PluginOption,
    reactRouter(),
    tsconfigPaths({
      root: __dirname,
    }),
  ],
  server: {
    port: 5175,
    proxy: {
      '/api/geetest': {
        target: 'https://www.geetest.com/demo/gt',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geetest/, ''),
      },
    },
  },
  resolve: {
    noExternal: FumadocsDeps,
  },
  ssr: {
    noExternal: SSRNoExternal,
  },
  optimizeDeps: {
    exclude: FumadocsDeps,
    include: ['@lobehub/icons', '@lobehub/ui'],
  },

});
