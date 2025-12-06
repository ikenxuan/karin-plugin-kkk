import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';

const getUrl = createGetUrl('/docs');

export default {
  ssr: true,
  async prerender ({ getStaticPaths }) {
    const paths: string[] = [...getStaticPaths()]
    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const normalizedEntry = entry.replace(/\\/g, '/')
      paths.push(getUrl(getSlugs(normalizedEntry)));
    }
    return paths
  },
} satisfies Config;
