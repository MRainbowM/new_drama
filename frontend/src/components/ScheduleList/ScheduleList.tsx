'use client'
import styles from './ScheduleList.module.scss'
import { components } from '../../api/schema'
import { monthToName } from './../../constants/months'
import { useState } from "react"
import clsx from "clsx"
import ScheduleItem from '../ScheduleItem/ScheduleItem'

interface ScheduleListProps {
    events: components['schemas']['EventShowOutSchema'][],
    months: string[]
}

export default function ScheduleList(
    { events, months }: ScheduleListProps
) {
    const [selectMonthValue, changeMonth] = useState(months[0]);

    const onClickMonth = (monthValue) => {
        changeMonth(() => monthValue);
    }

    function isSelectMonth(event) {
        const eventDate = new Date(event.start_at);
        return eventDate.getMonth().toString() === selectMonthValue;
    }

    return (
        <div className={styles.root}>
            <div className={styles.months} >
                {months.map(month => (
                    <span
                        key={month}
                        className={clsx({ [styles.select]: selectMonthValue === month })}
                        onClick={() => onClickMonth(month)}
                    >
                        {monthToName[month]}
                    </span>
                ))}
            </div>

            <div className={styles.list}>
                {events.filter(isSelectMonth).map(item => (
                    <ScheduleItem
                        event={item}
                        key={item.id}
                    />
                ))}
            </div>

        </div>
    );
}