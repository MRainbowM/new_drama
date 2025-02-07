import styles from './EventDetailTickets.module.scss'
import { apiClient } from '../../api/client'
import ScheduleList from '../ScheduleList/ScheduleList';

interface EventDetailTicketsProps {
    event_id: number
}


export default async function EventDetailTickets(
    { event_id }: EventDetailTicketsProps
) {
    // Спектакли в афише
    const response = await apiClient.GET('/event/event_show/list', {
        params: {
            query: {
                is_enable: true,
                from_current_month: true,
                event_id: event_id
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        throw new Error('error'); //TODO
        return (<></>);
    }

    let months = [] // Месяцы со спектаклями
    response.data.forEach(function (event, i, arr) {
        const startDate = new Date(event.start_at)
        const month = startDate.getMonth().toString()

        if (!months.includes(month)) {
            months.push(month)
        }
    });

    return (
        <>
            {response.data.length > 0 ? (
                <section className={styles.root} id="schedule">
                    <h2>Афиша</h2>

                    <ScheduleList
                        events={response.data}
                        months={months}
                    />
                </section>
            ) : (
                <></>
            )}
        </>
    );
}