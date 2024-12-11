'use client'
import styles from './EventPreviewContainer.module.scss'
import { components } from '../../api/schema'
import EventPreview from '../EventPreview/EventPreview';
import { useState } from "react"

interface EventPreviewContainerProps {
    eventList: components['schemas']['EventPreviewSchema'][]
}

export default function EventPreviewContainer(
    { eventList }: EventPreviewContainerProps
) {
    const [isActive, setActive] = useState(false)

    return (
        <div
            className={styles.root}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
        >
            {eventList.map(item => (
                <EventPreview
                    key={item.id}
                    event={item}
                    isActiveContainer={isActive}
                />
            ))}
        </div>
    );
}