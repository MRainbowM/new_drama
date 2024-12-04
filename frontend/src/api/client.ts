import { headers } from "next/headers" 

import createClient from "openapi-fetch"
import type { paths } from "./schema" 

export const apiClient = createClient<paths>({
    baseUrl: process.env.API_URL
})

apiClient.use({
    async onRequest({ request }) {
        // request.headers = headers();
        return request;
      },
})


// apiClient.GET('/api/event_show/list', {
//     params: {
//         query: {
//             start_at: '123'
//         }
//     }
// })

