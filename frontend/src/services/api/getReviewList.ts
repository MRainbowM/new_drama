import { apiClient } from '../../api/client'
import { components } from '../../api/schema'

interface GetReviewListParams {
    /* id спектакля - получение отзывов только для одного спектакля */
    event_id?: number,
    is_enable_main?: boolean,
    is_enable_event?: boolean
}

interface GetReviewListResult {
    /* Массив отзывов */
    reviewList: components['schemas']['ReviewOutSchema'][],
}

export async function getReviewList(
    { event_id, is_enable_main, is_enable_event }: GetReviewListParams = {}
): Promise<GetReviewListResult> {
    /* Получение списка спектаклей в афише */
    const response = await apiClient.GET('/api/info/reviews/', {
        params: {
            query: {
                event_id: event_id ? event_id : undefined,
                is_enable_main: is_enable_main ? is_enable_main : undefined,
                is_enable_event: is_enable_event ? is_enable_event : undefined,
            }
        }
    });

    if (response.error) {
        console.log(response.error); //TODO
        return { reviewList: [] };
    }

    const reviewList = response.data;

    return { reviewList };
}