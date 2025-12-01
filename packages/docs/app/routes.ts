import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'docs/page.tsx'),
  route('api/search', 'docs/search.ts'),
  route('geetest', 'routes/geetest.tsx'),
  route('llms-full.txt', 'routes/llms-full.ts'),
  { id: 'llms-mdx-index', path: 'llms.mdx', file: 'routes/llms-mdx.ts' },
  route('llms.mdx/*', 'routes/llms-mdx.ts'),
] satisfies RouteConfig;
