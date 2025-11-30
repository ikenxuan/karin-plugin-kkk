import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'docs/page.tsx'),
  route('api/search', 'docs/search.ts'),
  route('geetest', 'routes/geetest.tsx'),
] satisfies RouteConfig;
