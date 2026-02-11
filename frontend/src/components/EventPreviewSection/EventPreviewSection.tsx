import styles from './EventPreviewSection.module.scss';
import EventPreviewList from '../EventPreviewContainer/EventPreviewContainer';
import { getEventList } from '../../services/api/getEventList';

export default async function EventPreviewSection() {
    // Репертуар
    const { events } = await getEventList({
        show_on_main_page: true,
        order_by: 'name'
    });

    return (
        <section className={styles.root} id="events">
            <h2>Все спектакли</h2>
            <EventPreviewList
                eventList={events}
            />
        </section>
    )
}