// Portfolio update - 2024
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gebin.net',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
} 