import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
import { apiClient } from '../api/client';

function getSiteUrl(): string {
  // Главный базовый URL сайта для абсолютных ссылок в sitemap
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.startsWith('http')) return envUrl.replace(/\/$/, '');

  // Vercel/прочие окружения могут передавать VERCEL_URL без протокола
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  // Dev по умолчанию
  return 'http://localhost:3000';
}

type EventPreview = {
  slug: string;
};

async function fetchAllEventSlugs(): Promise<EventPreview[]> {
  const collected: EventPreview[] = [];

  // Итерация по страницам, пока не соберём все посты
  // Используем прямой вызов apiClient для контроля пагинации
  // и во избежание лишних зависимостей от UI-слоёв
  // eslint-disable-next-line no-constant-condition

  const response = await apiClient.GET('/api/event/event/list', {
    params: {}
  });

  if (response.error || !response.data) return collected;
  collected.push(...response.data);
  return collected;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // if (process.env.NODE_ENV === 'development') {
  //   return [];
  // }
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteUrl}/events`,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];

  try {
    const posts = await fetchAllEventSlugs();

    const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${siteUrl}/events/${p.slug}`,
      changeFrequency: 'weekly',
      priority: 0.6
    }));

    return [...staticEntries, ...postEntries];
  } catch {
    // В случае ошибки отдаём хотя бы статичные страницы
    return staticEntries;
  }
}

// Опционально: переодическая регенерация (если поддерживается окружением)
export const revalidate = 0;

