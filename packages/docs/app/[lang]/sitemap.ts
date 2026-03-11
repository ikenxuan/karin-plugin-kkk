import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function sitemap(props: Props): Promise<MetadataRoute.Sitemap> {
  const params = await props.params;
  const baseUrl = 'https://kkk.karinjs.com';
  const lang = params.lang || 'zh-CN';
  
  // 获取所有文档页面
  const pages = source.getPages();
  
  const docUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${lang}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${lang}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...docUrls];
}
