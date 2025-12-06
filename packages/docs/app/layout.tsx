import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import SearchDialog from '@/components/search';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'karin-plugin-kkk 文档',
    template: '%s | karin-plugin-kkk',
  },
  description: '多平台短视频/图文内容解析与推送 - 抖音/B站/快手/小红书',
  icons: {
    icon: '/logo.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <head>
        <Script src="/gt3.js" strategy="beforeInteractive" />
        <Script src="/gt4.js" strategy="beforeInteractive" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
      </body>
    </html>
  );
}
