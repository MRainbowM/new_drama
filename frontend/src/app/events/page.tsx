import EvenList from "../../components/EventList/EventList";
import { getEventList } from "../../services/getEventList";

export default async function EventListPage() {
    const { events } = await getEventList({ order_by: 'name' });

    const eventsByArchival = Object.groupBy(events, ({ is_archival }) => String(is_archival));

    return (
        <EvenList events={events} />
    );
}