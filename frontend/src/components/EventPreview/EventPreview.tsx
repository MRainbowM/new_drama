'use client'
import { components } from '../../api/schema'
import styles from './EventPreview.module.scss'
import clsx from "clsx"
import myImageLoader from '../../loaders/image-loader'

interface EventPreviewProps {
    event: components['schemas']['EventPreviewSchema'],
    isActiveContainer: boolean,
    isActive: boolean,
    onMouseOver: () => void
}

export default function EventPreview(
    { event, isActiveContainer, isActive, onMouseOver }: EventPreviewProps
) {
    const backgroundImageSrc = myImageLoader({src: event.cover})

    return (
        <div
            className={clsx(
                styles.root,
                { [styles.active]: isActive && isActiveContainer },
                { [styles.notActive]: !isActive && isActiveContainer }
            )}

            onMouseOver={onMouseOver}
        >
            <div
                className={styles.item}
                style={{ backgroundImage: `url(${backgroundImageSrc})` }}
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
        </div>
    );
}