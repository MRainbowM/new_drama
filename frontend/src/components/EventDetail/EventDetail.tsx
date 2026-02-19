import styles from './EventDetail.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'
import clsx from "clsx"
import EventDetailTickets from '../EventDetailTickets/EventDetailTickets'
import { EventDetailReview } from '../EventDetailReview/EventDetailReview'
import EventDetailGallery from '../EventDetailGallery/EventDetailGallery'

interface EventDetailProps {
    data: components['schemas']['EventDetailResponseSchema']
}


export default async function EventDetail(
    { data }: EventDetailProps
) {
    const intermission = data.event.has_intermission === true ? 'с антрактом' : 'без антракта';
    const peoplesGroupTag = (data.peoples ?? []).reduce<Record<string, typeof data.peoples>>(
        (acc, item) => {
            const key = item?.tag ?? 'unknown'
            if (!acc[key]) acc[key] = []
            acc[key].push(item)
            return acc
        },
        {}
    );
    const minAgeLimit = data.event.min_age_limit > 0 ? `${data.event.min_age_limit}+` : undefined;
    const premiereAt = data.event.premiere_at ? new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'long'
    }).format(new Date(data.event.premiere_at)) : null;

    return (
        <div className={styles.root}>
            <div className={styles.grid}>
                {
                    data.event.detail_cover_compressed_url ? (
                        <div className={styles.cover}>
                            <Image
                                src={data.event.detail_cover_compressed_url}
                                layout='fill'
                                priority={true}
                                alt={data.event.name}
                            />
                        </div>
                    ) : (
                        <div className={styles.defaultCover}></div>
                    )
                }

                <div className={styles.gridItem}>
                    <div className={styles.title}>
                        <h1>{data.event.name}</h1>
                        <div className={styles.row}>
                            <span>{data.event.short_description}</span>
                            <div>
                                <span className={styles.duration}>
                                    {data.event.duration_format}
                                </span>
                                <span>{intermission}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx(styles.gridItem, styles.textFont)}>
                    <div className={styles.peoples}>
                        {
                            data.event.dramatist ? (
                                <div className={styles.row}>
                                    <span>Драматург:</span>
                                    <span>{data.event.dramatist}</span>
                                </div>
                            ) : (<></>)
                        }
                        {
                            data.event.producer ? (
                                <div className={styles.row}>
                                    <span>Режиссер:</span>
                                    <span>
                                        {`${data.event.producer.first_name} ${data.event.producer.last_name}`}
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
                                            {`${people.people.first_name} ${people.people.last_name}`}
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
                    data.event.description ? (
                        <>
                            <div className={
                                clsx(styles.gridItem,
                                    styles.textFont,
                                    styles.description
                                )}
                            >
                                <div dangerouslySetInnerHTML={{ __html: data.event.description }}></div>
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
                                    data.event.description_cover_compressed_url ? (
                                        <Image
                                            src={data.event.description_cover_compressed_url}
                                            layout='fill'
                                            priority={true}
                                            alt={data.event.name}
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
                                                {`${people.people.first_name} ${people.people.last_name}`}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={clsx(styles.gridItem, styles.gridImg)}>
                            {
                                data.event.actor_cover_compressed_url ? (
                                    <Image
                                        src={data.event.actor_cover_compressed_url}
                                        layout='fill'
                                        priority={true}
                                        alt={data.event.name}
                                    />
                                ) : (<></>)
                            }
                        </div>

                    </>) : (<></>)
                }

            </div>
            {
                data.images && data.images.length > 0 ? (
                    <EventDetailGallery images={data.images} />
                ) : (<></>)
            }
            <EventDetailTickets event_id={data.event.id} />
            <EventDetailReview event_id={data.event.id} />
        </div >
    );
}