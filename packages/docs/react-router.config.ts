import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { vercelPreset } from '@vercel/react-router/vite';

const getUrl = createGetUrl('/docs');

// 在 Vercel 环境中使用 vercelPreset
const isVercel = process.env.VERCEL === '1';

export default {
  // 使用 SSR 但预渲染所有页面
  ssr: true,
  presets: isVercel ? [vercelPreset()] : [],
  async prerender({ getStaticPaths }) {
    const paths: string[] = [
      '/',           // 首页
      '/docs',       // 文档首页
      '/geetest',    // 极验验证页面
      ...getStaticPaths(),
    ];
    // 预渲染所有文档页面
    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const normalizedEntry = entry.replace(/\\/g, '/');
      const url = getUrl(getSlugs(normalizedEntry));
      paths.push(url);
    }
    return paths;
  },
} satisfies Config;
