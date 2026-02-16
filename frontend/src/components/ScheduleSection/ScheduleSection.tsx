import styles from './ScheduleSection.module.scss'
import ScheduleList from '../ScheduleList/ScheduleList';
import { getEventShowList } from '../../services/api/getEventShowList';


export default async function ScheduleSection() {
    const { events, months } = await getEventShowList();

    return (
        <>
            {events.length > 0 ? (
                <section className={styles.root} id="schedule">
                    <h2>Афиша</h2>

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