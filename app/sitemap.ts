import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // For multi-domain setup, generate sitemap dynamically based on current domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
