import styles from './ScheduleItem.module.scss'
import { components } from '../../api/schema'
import ScheduleCursor from '../ScheduleCursor/ScheduleCursor';
import { useState } from "react"
import clsx from "clsx"
import Link from 'next/link';

interface ScheduleItemProps {
    event: components['schemas']['EventShowOutSchema']
}


export default function ScheduleItem(
    { event }: ScheduleItemProps
) {
    const [isActive, setActive] = useState(false);
    const eventDetailLink = `/event/${event.event.slug}`;

    // Скрыть кнопку "Купить билет", если спектакль уже прошел
    const today = new Date();
    const start = new Date(event.start_at);
    const showBtnBuyTicket = today < start ? true : false;

    const openEventDetail = () => {
        location.href = eventDetailLink;
    }

    return (
        <>
            <div
                className={clsx(styles.root, { [styles.active]: isActive })}
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}
            >
                <div className={styles.container}>
                    <div
                        className={styles.left}
                        onClick={openEventDetail}
                    >
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
                            <div className={styles.premiere}>
                                {(
                                    event.is_premiere ? (
                                        <span>Премьера</span>
                                    ) : (<></>)
                                )}
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
                            {
                                showBtnBuyTicket ? (
                                    <Link
                                        href={event.link_to_buy_ticket}
                                        target='_blank'
                                        className={styles.btnBuy}
                                    >
                                        <span>Купить билет</span>
                                    </Link>
                                ) : (<></>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ScheduleCursor
                isActive={isActive}
                cover={event.event.preview_cover}
                eventId={event.event.id}
            />
        </>
    );
}