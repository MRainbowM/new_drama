import { getEventList } from "../../services/getEventList";

export default async function EventListPage() {
    const { events } = await getEventList({ order_by: 'name' });
}