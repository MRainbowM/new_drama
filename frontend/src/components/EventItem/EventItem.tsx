import { components } from '../../api/schema';
import styles from './EventItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface EventItemProps {
    event: components['schemas']['EventPreviewSchema']
}

export default function EventItem(
    { event }: EventItemProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.background}>
                <div className={styles.coverCol}>
                    {
                        event.cover_in_list_compressed_url ? (
                            <Link
                                href={`/events/${event.slug}`}
                            >
                                <Image
                                    className={styles.cover}
                                    src={event.cover_in_list_compressed_url}
                                    width={300}
                                    height={380}
                                    alt={event.name}
                                />
                            </Link>
                        ) : (<></>)
                    }
                    {
                        event.is_archival ? (
                            <span className={styles.archive}>
                                Архив
                            </span>
                        ) : (<></>)
                    }
                </div>

                <div className={styles.infoCol}>
                    <div className={styles.name}>
                        <Link

                            href={`/events/${event.slug}`}
                        >
                            {event.name}
                        </Link>
                    </div>

                    <div className={styles.description}>{event.short_description}</div>

                    {
                        event.producer ? (
                            <span className={styles.people}>
                                Режиссер: {`${event.producer.first_name} ${event.producer.last_name}`}
                            </span>
                        ) : (<></>)
                    }

                    {
                        event.dramatist ? (
                            <span className={styles.people}>
                                Драматург: {event.dramatist}
                            </span>
                        ) : (<></>)
                    }

                    <div className={styles.btnRow}>
                        <Link href={`/events/${event.slug}`}>
                            <span>Подробнее</span>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    );
}