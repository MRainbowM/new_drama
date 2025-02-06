import styles from './EventDetail.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'

interface EventDetailProps {
    event: components['schemas']['EventDetailSchema']
}


export default function EventDetail(
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

                <div className={styles.gridItem}>
                    <div className={styles.authors}>

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
                        <div className={styles.row}>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    );
}