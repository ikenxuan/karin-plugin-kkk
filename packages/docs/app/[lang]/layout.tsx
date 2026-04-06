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
    default: 'karin-plugin-kkk 文档 - 多平台短视频解析与推送插件',
    template: '%s | karin-plugin-kkk 文档',
  },
  description: '专业的多平台短视频/图文内容解析与推送插件，支持抖音、B站、快手、小红书等平台。提供无水印视频下载、评论区渲染、动态推送、弹幕烧录、动态照片解析等功能。基于 Karin 框架开发，开源免费。',
  keywords: [
    'karin-plugin-kkk',
    'karin插件',
    '短视频解析',
    '视频解析插件',
    '无水印下载',
    '抖音解析',
    'B站解析',
    '小红书解析',
    '快手解析',
    '视频下载',
    '内容推送',
    '动态推送',
    '评论区渲染',
    '弹幕烧录',
    '动态照片',
    'Motion Photo',
    'Live Photo',
    'Karin框架',
    'QQ机器人',
    '自动化推送',
    '开源插件',
  ],
  authors: [{ name: 'ikenxuan', url: 'https://github.com/ikenxuan' }],
  creator: 'ikenxuan',
  publisher: 'karin-plugin-kkk',
  metadataBase: new URL('https://kkk.karinjs.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://kkk.karinjs.com',
    siteName: 'karin-plugin-kkk 文档',
    title: 'karin-plugin-kkk - 多平台短视频解析与推送插件',
    description: '专业的多平台短视频/图文内容解析与推送插件，支持抖音、B站、快手、小红书。提供无水印视频下载、评论区渲染、动态推送、弹幕烧录等功能。',
    images: [
      {
        url: 'https://kkk.karinjs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'karin-plugin-kkk - 多平台短视频解析与推送插件',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'karin-plugin-kkk - 多平台短视频解析与推送插件',
    description: '专业的多平台短视频/图文内容解析与推送插件，支持抖音、B站、快手、小红书。',
    images: ['https://kkk.karinjs.com/og-image.png'],
    creator: '@ikenxuan',
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
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://kkk.karinjs.com',
    languages: {
      'zh-CN': 'https://kkk.karinjs.com/zh-CN',
      'zh-HK': 'https://kkk.karinjs.com/zh-HK',
    },
  },
  verification: {
    // 添加搜索引擎验证码（需要在搜索引擎管理后台获取）
    // google: 'your-google-verification-code',
    // baidu: 'your-baidu-verification-code',
  },
  category: 'technology',
};

const { provider } = defineI18nUI(i18n, {
  translations: {
    'zh-CN': {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '未找到结果',
      toc: '本页目录',
      tocNoHeadings: '暂无标题',
      lastUpdate: '最后更新于',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '主题',
      editOnGithub: '在 GitHub 上编辑',
    },
    'zh-HK': {
      displayName: '繁體中文 (香港)',
      search: '搜尋文件',
      searchNoResult: '未找到結果',
      toc: '本頁目錄',
      tocNoHeadings: '暫無標題',
      lastUpdate: '最後更新於',
      chooseLanguage: '選擇語言',
      nextPage: '下一頁',
      previousPage: '上一頁',
      chooseTheme: '主題',
      editOnGithub: '在 GitHub 上編輯',
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
  
  // 结构化数据 (JSON-LD) 用于 SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'karin-plugin-kkk',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    description: '专业的多平台短视频/图文内容解析与推送插件，支持抖音、B站、快手、小红书等平台。',
    url: 'https://kkk.karinjs.com',
    author: {
      '@type': 'Person',
      name: 'ikenxuan',
      url: 'https://github.com/ikenxuan',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
    featureList: [
      '抖音视频解析',
      'B站视频解析',
      '快手视频解析',
      '小红书图文解析',
      '无水印下载',
      '评论区渲染',
      '动态推送',
      '弹幕烧录',
      '动态照片解析',
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'karin-plugin-kkk',
    url: 'https://kkk.karinjs.com',
    logo: 'https://kkk.karinjs.com/icon-light.svg',
    sameAs: [
      'https://github.com/ikenxuan/karin-plugin-kkk',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'karin-plugin-kkk 文档',
    url: 'https://kkk.karinjs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kkk.karinjs.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <head>
        <Script src="https://static.geetest.com/static/js/gt.0.5.0.js" strategy="beforeInteractive" />
        <Script src="https://static.geetest.com/v4/gt4.js" strategy="beforeInteractive" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }} i18n={provider(lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
