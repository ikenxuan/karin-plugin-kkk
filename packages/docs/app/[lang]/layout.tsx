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

export const siteInfo = {
  name: 'karin-plugin-kkk',
  description: '多平台短视频/图文内容解析与推送',
  url: 'https://kkk.karinjs.com',
  image: 'https://kkk.karinjs.com/og-image.png',
};

export const metadata: Metadata = {
  title: {
    default: 'karin-plugin-kkk 文档',
    template: '%s | karin-plugin-kkk',
  },
  description: '多平台短视频/图文内容解析与推送 - 支持抖音/B站/快手/小红书等平台内容采集、解析与自动化推送',
  keywords: ['短视频解析', '内容推送', '抖音解析', 'B站解析', '小红书解析', '快手解析', '自动化推送', 'karin'],
  metadataBase: new URL('https://kkk.karinjs.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'karin-plugin-kkk',
    title: 'karin-plugin-kkk 文档',
    description: '多平台短视频/图文内容解析与推送',
    images: [
      {
        url: 'https://kkk.karinjs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'karin-plugin-kkk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'karin-plugin-kkk 文档',
    description: '多平台短视频/图文内容解析与推送',
    images: ['https://kkk.karinjs.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
  alternates: {
    canonical: 'https://kkk.karinjs.com',
    languages: {
      'zh-CN': 'https://kkk.karinjs.com/zh-CN',
      'zh-HK': 'https://kkk.karinjs.com/zh-HK',
    },
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
        <Script src="https://static.geetest.com/static/js/gt.0.5.0.js" strategy="beforeInteractive" />
        <Script src="https://static.geetest.com/v4/gt4.js" strategy="beforeInteractive" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }} i18n={provider(lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
