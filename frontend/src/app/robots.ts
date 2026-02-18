import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';
  console.log(process.env.NODE_ENV);
  const siteUrl = getSiteUrl();

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    };
  }

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    {
      userAgent: 'facebookexternalhit',
      allow: '/',
      disallow: ['/admin', '/api'],
    }],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}

function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.startsWith('http')) return envUrl.replace(/\/$/, '');

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return 'http://localhost:3000';
}

