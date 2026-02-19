import { apiClient } from '../../api/client';
import { components } from '../../api/schema';


interface GetEventBySlugParams {
    slug: string
}

interface GetEventBySlugResult {
    event: components['schemas']['EventDetailSchema'] | null
}

export async function getEventBySlug(
    { slug }: GetEventBySlugParams): Promise<GetEventBySlugResult> {
    const response = await apiClient.GET('/api/events/{slug}/', {
        params: {
            path: { slug }
        }
    })

    if (response.error) {
        console.error(response.error);
        return { event: null }
    }

    return { event: response.data }
}