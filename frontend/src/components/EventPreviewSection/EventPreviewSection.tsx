import styles from './EventPreviewSection.module.scss'
import { apiClient } from '../../api/client'
import EventPreviewList from '../EventPreviewContainer/EventPreviewContainer';

export default async function EventPreviewSection() {
    // Репертуар
    const response = await apiClient.GET('/event/event/list', {
        params: {
            query: {
                is_enable: true
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        throw new Error('error'); //TODO
    }

    return (
        <section className={styles.root}>
            <h2>Все спектакли</h2>
            <EventPreviewList
                eventList={response.data}
            />
        </section>
    )
}