import styles from './ScheduleItem.module.scss'
import { components } from '../../api/schema'
import ScheduleCursor from '../ScheduleCursor/ScheduleCursor';
import { useState } from "react"
import clsx from "clsx"

interface ScheduleItemProps {
    event: components['schemas']['EventShowOutSchema']
}


export default function ScheduleItem(
    { event }: ScheduleItemProps
) {
    const [isActive, setActive] = useState(false)

    return (
        <>
            <div
                className={clsx(styles.root, { [styles.active]: isActive })}
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}
            >
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.dateCol}>
                            <span className={styles.date}>
                                {new Intl.DateTimeFormat('ru-RU', {
                                    day: 'numeric',
                                    month: 'numeric',
                                }).format(
                                    new Date(event.start_at)
                                )}
                            </span>
                            <div className={styles.time}>
                                <span>
                                    {new Intl.DateTimeFormat('ru-RU', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    }).format(
                                        new Date(event.start_at)
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className={styles.titleCol}>
                            <span className={styles.name}>
                                {event.event.name}
                            </span>
                            <span className={styles.description}>
                                {event.event.short_description}
                            </span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.age}>
                            {(
                                event.event.min_age_limit > 0 ? (
                                    <span>{event.event.min_age_limit} + </span>
                                ) : (<></>)
                            )}
                        </div>
                        <div className={styles.btnCol}>
                            <div className={styles.btnBuy}>
                                <span>Купить билет</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScheduleCursor
                isActive={isActive}
                cover={event.event.preview_cover}
            />
        </>
    );
}