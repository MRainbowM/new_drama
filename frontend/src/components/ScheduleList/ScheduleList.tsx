'use client'
import styles from './ScheduleList.module.scss'
import { components } from '../../api/schema'
import { monthToName } from './../../constants/months'

interface ScheduleListProps {
    events: components['schemas']['EventShowOutSchema'][],
    months: string[]
}

export default function ScheduleList(
    { events, months }: ScheduleListProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.filters}>
                <div className={styles.months} >
                    {months.map(month => (
                        <span key={month}>{monthToName[month]}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}