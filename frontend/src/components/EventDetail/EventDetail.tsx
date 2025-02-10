import styles from './EventDetail.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'
import clsx from "clsx"
import EventDetailTickets from '../EventDetailTickets/EventDetailTickets'
import { EventDetailReview } from '../EventDetailReview/EventDetailReview'

interface EventDetailProps {
    event: components['schemas']['EventDetailSchema']
}


export default async function EventDetail(
    { event }: EventDetailProps
) {
    const intermission = event.has_intermission === true ? 'с антрактом' : 'без антракта';
    const peoplesGroupTag = Object.groupBy(event.peoples, ({ tag }) => tag);

    return (
        <div className={styles.root}>
            <div className={styles.grid}>
                <div className={styles.cover}>
                    <Image
                        src={event.detail_cover}
                        layout='fill'
                        priority={true}
                        alt={event.name}
                    />
                </div>

                <div className={styles.gridItem}>
                    <div className={styles.title}>
                        <h1>{event.name}</h1>
                        <div className={styles.row}>
                            <span>{event.short_description}</span>
                            <div>
                                <span>2:20</span>
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
                                    <span>
                                        {`${event.dramatist.first_name} ${event.dramatist.last_name}`}
                                    </span>
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
                                            {`${people.people.first_name} ${people.people.last_name}`}
                                        </span>
                                    </div>
                                ))

                            ) : (<></>)
                        }
                    </div>
                </div>
                {
                    event.description ? (
                        <>
                            <div className={clsx(styles.gridItem, styles.textFont)}>
                                {event.description}
                            </div>
                            <div className={clsx(styles.gridItem, styles.gridImg)}>
                                {
                                    event.description_cover ? (
                                        <Image
                                            src={event.description_cover}
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
                        <div className={clsx(styles.gridItem, styles.textFont)}>
                            <h2>Действующие лица</h2>
                            <div className={styles.peoples}>
                                {
                                    peoplesGroupTag['actor'].map((people, index) => (
                                        <div className={styles.row} key={index}>
                                            <span>{`${people.role}:`}</span>
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
                                event.actor_cover ? (
                                    <Image
                                        src={event.actor_cover}
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

            <EventDetailTickets event_id={event.id} />
            <EventDetailReview event_id={event.id} />
        </div >
    );
}