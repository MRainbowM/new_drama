import { apiClient } from '../../api/client'
import { components } from '../../api/schema'


interface GetInfoBlocksParams {
    in_menu?: boolean,
}

interface GetInfoBlocksResult {
    infoBlocks: components['schemas']['InfoBlockOutSchema'][],
}
export async function getInfoBlocks({ in_menu }: GetInfoBlocksParams = {}): Promise<GetInfoBlocksResult> {
    const response = await apiClient.GET('/api/info/info-blocks/', {
        params: {
            query: {
                in_menu: in_menu ? in_menu : undefined,
            }
        }
    });
   
    if (response.error) {
        console.log(response.error); //TODO
        return { infoBlocks: [] };
    }

    return { infoBlocks: response.data };
}