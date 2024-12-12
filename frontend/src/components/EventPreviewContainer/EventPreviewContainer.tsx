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
    const [activeIndex, setActiveIndex] = useState(null)

    return (
        <div
            className={styles.root}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => {
                setActive(false)
                setActiveIndex(null)
            }}
        >
            {eventList.map((item, index) => (
                <EventPreview
                    key={item.id}
                    event={item}
                    isActiveContainer={isActive}
                    onMouseOver={() => setActiveIndex(index)}
                    isActive={activeIndex === index}
                />
            ))}
        </div>
    );
}