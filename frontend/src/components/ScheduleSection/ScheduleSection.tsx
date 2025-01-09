import styles from './ScheduleSection.module.scss'
import { apiClient } from '../../api/client'
import ScheduleList from '../ScheduleList/ScheduleList';


export default async function ScheduleSection() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthString = month < 10 ? `0${month}`: month;
    const startDate = `${currentDate.getFullYear()}-${monthString}-01`


    // Спектакли в афише
    const response = await apiClient.GET('/api/event/event_show/list', {
        params: {
            query: {
                is_enable: true,
                start_at__gte: startDate
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
                <section className={styles.root}>
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