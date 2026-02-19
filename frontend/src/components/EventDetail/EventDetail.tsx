import styles from './EventDetail.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'
import clsx from "clsx"
import EventDetailTickets from '../EventDetailTickets/EventDetailTickets'
import { EventDetailReview } from '../EventDetailReview/EventDetailReview'
import EventDetailGallery from '../EventDetailGallery/EventDetailGallery'

interface EventDetailProps {
    event: components['schemas']['EventDetailSchema']
}


export default async function EventDetail(
    { event }: EventDetailProps
) {
    const intermission = event.has_intermission === true ? 'с антрактом' : 'без антракта';
    const peoplesGroupTag = (event.peoples ?? []).reduce<Record<string, typeof event.peoples>>(
        (acc, item) => {
            const key = item?.tag ?? 'unknown'
            if (!acc[key]) acc[key] = []
            acc[key].push(item)
            return acc
        },
        {}
    );
    const minAgeLimit = event.min_age_limit > 0 ? `${event.min_age_limit}+` : undefined;
    const premiereAt = event.premiere_at ? new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'long'
    }).format(new Date(event.premiere_at)) : null;

    return (
        <div className={styles.root}>
            <div className={styles.grid}>
                {
                    event.detail_cover_compressed_url ? (
                        <div className={styles.cover}>
                            <Image
                                src={event.detail_cover_compressed_url}
                                layout='fill'
                                priority={true}
                                alt={event.name}
                            />
                        </div>
                    ) : (
                        <div className={styles.defaultCover}></div>
                    )
                }

                <div className={styles.gridItem}>
                    <div className={styles.title}>
                        <h1>{event.name}</h1>
                        <div className={styles.row}>
                            <span>{event.short_description}</span>
                            <div>
                                <span className={styles.duration}>
                                    {event.duration_format}
                                </span>
                                <span>{intermission}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx(styles.gridItem, styles.textFont)}>
                    <div className={styles.peoples}>
                        {
                            event.dramatist ? (
                                <div className={styles.row}>
                                    <span>Драматург:</span>
                                    <span>{event.dramatist}</span>
                                </div>
                            ) : (<></>)
                        }
                        {
                            event.producer ? (
                                <div className={styles.row}>
                                    <span>Режиссер:</span>
                                    <span>
                                        {`${event.producer.first_name} ${event.producer.last_name}`}
                                    </span>
                                </div>
                            ) : (<></>)
                        }
                        {
                            peoplesGroupTag['author'] ? (
                                peoplesGroupTag['author'].map((people, index) => (
                                    <div className={styles.row} key={index}>
                                        <span>{`${people.role}:`}</span>
                                        <span>
                                            {`${people.first_name} ${people.last_name}`}
                                        </span>
                                    </div>
                                ))

                            ) : (<></>)
                        }
                        {
                            premiereAt ? (
                                <div className={clsx(styles.row, styles.premiere)} >
                                    <span>{"Дата премьеры:"}</span>
                                    <span>{premiereAt}</span>
                                </div>

                            ) : (<></>)
                        }
                    </div>
                </div>
                {
                    event.description ? (
                        <>
                            <div className={
                                clsx(styles.gridItem,
                                    styles.textFont,
                                    styles.description
                                )}
                            >
                                <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
                                {
                                    minAgeLimit ? (
                                        <span className={styles.ageLimit}  >
                                            {minAgeLimit}
                                        </span>
                                    ) : (<></>)
                                }
                            </div>
                            <div className={clsx(styles.gridItem, styles.gridImg)}>
                                {
                                    event.description_cover_compressed_url ? (
                                        <Image
                                            src={event.description_cover_compressed_url}
                                            layout='fill'
                                            priority={true}
                                            alt={event.name}
                                        />
                                    ) : (<></>)
                                }
                            </div>
                        </>
                    ) : (<></>)
                }
                {
                    peoplesGroupTag['actor'] ? (<>
                        <div className={clsx(styles.gridItem)}>
                            <h2>Действующие лица</h2>
                            <div className={clsx(styles.peoples, styles.textFont)}>
                                {
                                    peoplesGroupTag['actor'].map((people, index) => (
                                        <div className={styles.row} key={index}>
                                            {
                                                people.role ? (
                                                    <span>{`${people.role}:`}</span>
                                                ) : (
                                                    <span></span>
                                                )
                                            }
                                            <span>
                                                {`${people.first_name} ${people.last_name}`}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={clsx(styles.gridItem, styles.gridImg)}>
                            {
                                event.actor_cover_compressed_url ? (
                                    <Image
                                        src={event.actor_cover_compressed_url}
                                        layout='fill'
                                        priority={true}
                                        alt={event.name}
                                    />
                                ) : (<></>)
                            }
                        </div>

                    </>) : (<></>)
                }

            </div>
            {
                event.images && event.images.length > 0 ? (
                    <EventDetailGallery images={event.images} />
                ) : (<></>)
            }
            <EventDetailTickets event_id={event.id} />
            <EventDetailReview event_id={event.id} />
        </div >
    );
}