'use client'
import { components } from '../../api/schema'
import styles from './EventPreview.module.scss'
import clsx from "clsx"
import myImageLoader from '../../loaders/image-loader'
import Link from 'next/link'

interface EventPreviewProps {
    event: components['schemas']['EventPreviewSchema'],
    isActiveContainer: boolean,
    isActive: boolean,
    onMouseOver: () => void
}

export default function EventPreview(
    { event, isActiveContainer, isActive, onMouseOver }: EventPreviewProps
) {
    const backgroundImageSrc = event.cover_compressed_url ? myImageLoader({ src: event.cover_compressed_url }) : '';

    const eventDetailLink = `/events/${event.slug}`;
    const openEventDetail = () => {
        location.href = eventDetailLink;
    }

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
                onClick={openEventDetail}
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
                                <span>Драматург: {event.dramatist}</span>
                            ) : (<></>)
                        }
                        {
                            event.producer ? (
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