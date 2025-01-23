'use client'
import styles from './ViewerList.module.scss'
import { components } from '../../api/schema'
import useEmblaCarousel from 'embla-carousel-react'
import ViewerItem from '../ViewerItem/ViewerItem'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'

interface ViewerListProps {
    viewerList: components['schemas']['ViewerOutSchema'][]
}


export default function ViewerList(
    { viewerList }: ViewerListProps
) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
        align: 'start'
    });

    return (
        <div className={styles.root}>
            <ArrowLeft emblaApi={emblaApi} />

            <div className={styles.wrap} ref={emblaRef}>
                <div className={styles.list}>
                    {viewerList.map((item, index) => (
                        <ViewerItem
                            key={item.id}
                            viewer={item}
                        />
                    ))}
                </div>
            </div>

            <ArrowRight emblaApi={emblaApi} />
        </div>
    );
}