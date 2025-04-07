import { components } from '../../api/schema';
import EventItem from '../EventItem/EventItem';
import styles from './EventList.module.scss';

interface EvenListProps {
    events: components['schemas']['EventPreviewSchema'][]
}

export default async function EvenList(
    { events }: EvenListProps
) {
    // Спектакли, сгруппированные по первой букве названия
    let eventByAbc = {};
    let lastLetter = null;

    events.forEach((event) => {
        const firstLetter = event.name[0].toUpperCase();
        if (lastLetter != firstLetter) {
            lastLetter = firstLetter;
            eventByAbc[firstLetter] = [];
        }
        eventByAbc[firstLetter].push(event);

    });

    return (
        <div className={styles.root}>
            {Object.keys(eventByAbc).map((letter, index) => (
                <div
                    key={index}
                    className={styles.group}
                >
                    <span className={styles.letter}>
                        {letter}
                    </span>

                    <div className={styles.events}>
                        {
                            eventByAbc[letter].map((event, eventIndex) => (

                                <EventItem
                                    key={eventIndex}
                                    event={event}
                                />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}