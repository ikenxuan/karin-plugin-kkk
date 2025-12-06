import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { vercelPreset } from '@vercel/react-router/vite';

const getUrl = createGetUrl('/docs');

export default {
  ssr: true,
  presets: [vercelPreset()],
  async prerender ({ getStaticPaths }) {
    const paths: string[] = [
      '/',           // 首页
      '/docs',       // 文档首页
      '/geetest',    // 极验验证页面
      ...getStaticPaths()
    ]
    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const normalizedEntry = entry.replace(/\\/g, '/')
      paths.push(getUrl(getSlugs(normalizedEntry)));
    }
    return paths
  },
} satisfies Config;
