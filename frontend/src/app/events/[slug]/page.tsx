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
    const { event } = await getEventBySlug({ slug })

    if (!event) {
        return (<></>);
    }

    return (<EventDetail event={event}/>)
}