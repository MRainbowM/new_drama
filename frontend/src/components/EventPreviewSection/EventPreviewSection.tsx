import styles from './EventPreviewSection.module.scss'
import { apiClient } from '../../api/client'
import EventPreviewList from '../EventPreviewContainer/EventPreviewContainer';
import Arrow from 'public/static/images/arrow.svg'

export default async function EventPreviewSection() {
    // Репертуар
    const response = await apiClient.GET('/api/event/event/list', {
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
            <div className={styles.container}>
                <div className={styles.arrowLeft}>
                    <div className={styles.arrow}>
                        <Arrow />
                    </div>
                </div>

                <EventPreviewList
                    eventList={response.data}
                />

                <div className={styles.arrowRight}>
                    <div className={styles.arrow}>
                        <Arrow />
                    </div>
                </div>
            </div>

        </section>
    )
}