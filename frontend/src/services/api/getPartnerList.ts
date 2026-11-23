import { apiClient } from '../../api/client'
import { components } from '../../api/schema'

interface GetPartnerListResult {
    partnerList: components['schemas']['PartnerOutSchema'][]
}

export async function getPartnerList(): Promise<GetPartnerListResult> {
    const response = await apiClient.GET('/api/info/partners/', {
        next: { revalidate: 60 },
    });
    if (response.error) {
        console.log(response.error); //TODO
        return { partnerList: [] };
    }

    return { partnerList: response.data };
}