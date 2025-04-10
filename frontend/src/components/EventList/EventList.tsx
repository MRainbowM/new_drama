'use client';

import { components } from '../../api/schema';
import EventItem from '../EventItem/EventItem';
import ToggleButton from '../ToggleButton/ToggleButton';
import styles from './EventList.module.scss';
import { useState } from 'react';


interface EvenListProps {
    events: components['schemas']['EventPreviewSchema'][]
}

export default function EvenList(
    { events }: EvenListProps
) {
    const [showArchive, setShowArchive] = useState(false);

    const filterEvents = (archive) => {
        let result = [];
        events.forEach((event) => {
            if (archive === true || event.is_archival === false) {
                result.push(event);
            }
        });
        return result;
    }

    const [eventList, setEventList] = useState(filterEvents(false));

    const onChangeToggle = () => {
        const curState = showArchive;
        setShowArchive(!curState);
        setEventList(filterEvents(!curState));
    };

    return (
        <div className={styles.root}>
            <h1>Спектакли</h1>
            <div className={styles.filter}>
                <ToggleButton
                    toggleValue={showArchive}
                    onChange={onChangeToggle}
                />
                {
                    showArchive ? (
                        <span className={styles.text}>
                            Скрыть архив
                        </span>
                    ) : (
                        <span className={styles.text}>
                            Показать архив
                        </span>
                    )
                }
            </div>
            <div className={styles.events}>
                {
                    eventList.map((event, index) => (
                        <EventItem
                            key={`${index}-${event.id}`}
                            event={event}
                        />
                    ))
                }
            </div>
        </div>
    );
}