import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from "next"
import { codeInspectorPlugin } from 'code-inspector-plugin';

const withMDX = createMDX()


const config: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: codeInspectorPlugin({
      bundler: 'turbopack',
      showSwitch: true
    }),
  },
  async rewrites () {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // 优化图片加载
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 压缩
  compress: true,
  // 生产环境优化
  productionBrowserSourceMaps: false,
}

export default withMDX(config)

