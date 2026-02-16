import { apiClient } from '../../api/client'
import { components } from '../../api/schema'

interface GetPopupActiveResult {
    popup: components['schemas']['PopupOutSchema'] | null
}

export async function getPopupActive(): Promise<GetPopupActiveResult> {
    const response = await apiClient.GET('/api/info/popups/active/', { cache: 'no-cache' });
    
    if (response.error) {
        console.log(response.error); //TODO
        return { popup: null };
    }

    return { popup: response.data };
}