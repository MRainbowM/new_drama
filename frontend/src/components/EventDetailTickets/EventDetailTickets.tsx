import styles from './EventDetailTickets.module.scss';
import ScheduleList from '../ScheduleList/ScheduleList';
import { getEventShowList } from '../../services/getEventShowList';

interface EventDetailTicketsProps {
    event_id: number
}


export default async function EventDetailTickets(
    { event_id }: EventDetailTicketsProps
) {
    const { events, months } = await getEventShowList({event_id});

    return (
        <>
            {events.length > 0 ? (
                <section className={styles.root}>
                    <h2>Билеты</h2>
                    <ScheduleList
                        events={events}
                        months={months}
                    />
                </section>
            ) : (
                <></>
            )}
        </>
    );
}