import { MetadataRoute } from 'next'

import { source } from '@/lib/source'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kkk.karinjs.com'

  const pages = source.getPages()

  const docUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    }
  ]

  return [...staticPages, ...docUrls]
}
