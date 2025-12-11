import { RootProvider } from 'fumadocs-ui/provider/next';
import '../global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import SearchDialog from '@/components/search';
import Script from 'next/script';
import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

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
    icon: [
      { url: '/icon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

const { provider } = defineI18nUI(i18n, {
  translations: {
    'zh-CN': {
      displayName: '简体中文',
    },
    'zh-HK': {
      displayName: '繁體中文 (香港)',
    },
  },
});

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <head>
        <Script src="/gt3.js" strategy="beforeInteractive" />
        <Script src="/gt4.js" strategy="beforeInteractive" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }} i18n={provider(lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
