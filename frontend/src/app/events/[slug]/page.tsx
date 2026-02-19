import EventDetail from '../../../components/EventDetail/EventDetail';
import { getEventBySlug } from '../../../services/api/getEventBySlug';

interface EventPageProps {
    params: {
        slug: string
    }
}

export default async function EventPage(
    { params: { slug } }: EventPageProps
) {
    const { data } = await getEventBySlug({ slug })

    if (!data) {
        return (<></>);
    }

    return (<EventDetail data={data}/>)
}