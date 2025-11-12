import type { MetadataRoute } from 'next'

export default function robots (): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://shophikes.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/studio',
          '/_next/', 
          '/cart',
        ]
      }
    ],
    sitemap: `${base}/sitemap.xml`
  }
}
