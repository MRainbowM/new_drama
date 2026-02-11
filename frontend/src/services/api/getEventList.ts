import { apiClient } from '../../api/client';
import { components } from '../../api/schema';

interface GetEventListParams {
    /* Спектакли в слайдере на главной странице */
    show_on_main_page?: boolean,
    /* Сортировка спектаклей */
    order_by?: '?' | 'name'
}

interface GetEventListResult {
    /* Массив спектаклей */
    events: components['schemas']['EventPreviewSchema'][]
}

export async function getEventList(
    { show_on_main_page, order_by }: GetEventListParams = {}
): Promise<GetEventListResult> {
    /* Получение списка спектаклей */
    const response = await apiClient.GET('/api/event/event/list', {
        params: {
            query: {
                show_on_main_page: show_on_main_page ? show_on_main_page : undefined,
                order_by: order_by ? order_by : undefined
            }
        }
    });

    if (response.error) {
        console.log(response.error); //TODO
        return {
            events: []
        };
    }

    return { events: response.data };
}