'use client'
import styles from './ScheduleList.module.scss'
import { components } from '../../api/schema'
import { monthToName } from './../../constants/months'
import { useState } from "react"
import clsx from "clsx"

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

            
        </div>
    );
}