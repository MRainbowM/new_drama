import styles from './EventDetailTickets.module.scss';
import ScheduleList from '../ScheduleList/ScheduleList';
import { getEventShowList } from '../../services/getEventShowList';

interface EventDetailTicketsProps {
    event_id: number
}


export default async function EventDetailTickets(
    { event_id }: EventDetailTicketsProps
) {
    const { events, months } = await getEventShowList({ event_id });

    return (
        <section className={styles.root}>
            <h2>Билеты</h2>
            {events.length > 0 ? (
                <ScheduleList
                    events={events}
                    months={months}
                />
            ) : (
                <div className={styles.notFoundText}>
                    <span>В этом месяце не ставим, следите за афишей, чтобы не пропустить </span>

                    <div  className={styles.social}>

                    </div>
                </div>
            )}
        </section>

    );
}