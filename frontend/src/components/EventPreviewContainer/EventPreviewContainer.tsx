'use client'
import styles from './EventPreviewContainer.module.scss'
import { components } from '../../api/schema'
import EventPreview from '../EventPreview/EventPreview';
import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import ArrowLeft from '../ArrowLeft/ArrowLeft';
import ArrowRight from '../ArrowRight/ArrowRight';


interface EventPreviewContainerProps {
    eventList: components['schemas']['EventPreviewSchema'][]
}

export default function EventPreviewContainer(
    { eventList }: EventPreviewContainerProps
) {
    const [isActive, setActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
        align: 'start'
    });

    return (
        <div className={styles.root}>
            <ArrowLeft emblaApi={emblaApi} />
            <div className={styles.wrap} ref={emblaRef}>
                <div
                    className={styles.list}
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
            </div>
            <ArrowRight emblaApi={emblaApi}/>
        </div>
    );
}