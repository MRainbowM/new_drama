'use client'
import { components } from '../../api/schema'
import styles from './EventPreview.module.scss'
import { useState } from "react"
import clsx from "clsx"

interface EventPreviewProps {
    event: components['schemas']['EventPreviewSchema'],
    isActiveContainer: boolean
}

export default function EventPreview(
    { event, isActiveContainer }: EventPreviewProps
) {
    const [isActive, setActive] = useState(false)

    return (
        <div
            className={clsx(
                styles.item,
                { [styles.active]: isActive && isActiveContainer},
                { [styles.notActive]: !isActive && isActiveContainer}
            )}
            style={{ backgroundImage: `url(http://0.0.0.0:8011/${event.preview_cover})` }}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
        >
            <div className={styles.text}>
                <div className={styles.leftCol}>
                    <span className={styles.title}>
                        {event.name}
                    </span>
                    <span className={styles.description}>
                        {event.short_description}
                    </span>
                </div>
                <div className={styles.rightCol}>
                    {
                        event.dramatist ? (
                            <span>
                                Драматург: {event.dramatist.first_name} {event.dramatist.last_name}
                            </span>
                        ) : (<></>)
                    }
                    {
                        event.dramatist ? (
                            <span>
                                Режиссер: {event.producer.first_name} {event.producer.last_name}
                            </span>
                        ) : (<></>)
                    }
                </div>
            </div>
            <div className={styles.btn}>
                <span>О спектакле</span>
            </div>
        </div>
    );
}