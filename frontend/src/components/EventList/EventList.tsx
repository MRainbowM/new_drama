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
    const getEventByAbs = (archive) => {
        // Группировка спектаклей по первой букве названия
        let result = {}
        let lastLetter = null;

        events.forEach((event) => {
            if (archive === true || event.is_archival === false) {
                const firstLetter = event.name[0].toUpperCase();
                if (lastLetter != firstLetter) {
                    lastLetter = firstLetter;
                    result[firstLetter] = [];
                }
                result[firstLetter].push(event);
            }
        });
        return result;
    }

    const [eventByAbc, setEventByAbc] = useState(getEventByAbs(false));

    const onChangeToggle = () => {
        const curState = showArchive;
        setShowArchive(!curState);
        setEventByAbc(getEventByAbs(!curState));
    };

    return (
        <div className={styles.root}>
            <div className={styles.filter}>
                <ToggleButton
                    toggleValue={showArchive}
                    onChange={onChangeToggle}
                />
                <span className={styles.text}>
                    Показывать архив
                </span>
            </div>
            <div className={styles.eventsContainer}>
                {Object.keys(eventByAbc).map((letter, index) => (
                    <div
                        key={`${index}-${letter}`}
                        className={styles.group}
                    >
                        <span className={styles.letter}>
                            {letter}
                        </span>

                        <div className={styles.events}>
                            {
                                eventByAbc[letter].map((event, eventIndex) => (

                                    <EventItem
                                        key={`${eventIndex}-${event.id}`}
                                        event={event}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}