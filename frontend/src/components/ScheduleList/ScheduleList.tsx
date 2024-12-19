'use client'
import styles from './ScheduleList.module.scss'
import { components } from '../../api/schema'
import { monthToName } from './../../constants/months'

interface ScheduleListProps {
    events: components['schemas']['EventShowOutSchema'][],
    months: string[]
}

export default  function ScheduleList(
    { events, months }: ScheduleListProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.filters}>
            {months.map(month => (
                    <div
                        className={styles.months}
                    >
                        <span>{monthToName[month]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}