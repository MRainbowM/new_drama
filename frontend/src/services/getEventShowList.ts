import { apiClient } from '../api/client'
import { components } from '../api/schema'

interface GetEventShowListParams {
    /* id спектакля - получение афиши только для одного спектакля */
    event_id?: number
}

interface GetEventShowListResult {
    /* id Массив спектаклей */
    events: components['schemas']['EventShowOutSchema'][],
    /* Месяцы со спектаклями */
    months: string[]
}

export async function getEventShowList(
    { event_id }: GetEventShowListParams = {}
): Promise<GetEventShowListResult> {
    /* Получение списка спектаклей в афише */
    const response = await apiClient.GET('/event/event_show/list', {
        params: {
            query: {
                is_enable: true,
                from_current_month: true,
                event_id: event_id ? event_id : undefined
            }
        }
    });

    if (response.error) {
        console.log(response.error); //TODO
        return {
            events: [],
            months: []
        };
        // throw new Error('error');
    }

    const events = response.data;

    const months = []
    response.data.forEach(function (event, i, arr) {
        const startDate = new Date(event.start_at)
        const month = startDate.getMonth().toString()

        if (!months.includes(month)) {
            months.push(month)
        }
    });

    return { events, months };
}