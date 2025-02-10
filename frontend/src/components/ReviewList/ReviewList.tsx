'use client'
import styles from './ReviewList.module.scss'
import { components } from '../../api/schema'
import useEmblaCarousel from 'embla-carousel-react'
import ReviewItem from '../ReviewItem/ReviewItem'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'


interface ReviewListProps {
    reviewList: components['schemas']['ReviewOutSchema'][]
}

export default function ReviewList(
    { reviewList }: ReviewListProps
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
                    {reviewList.map((item, index) => (
                        <ReviewItem
                            key={item.id}
                            review={item}
                        />
                    ))}
                </div>
            </div>

            <ArrowRight emblaApi={emblaApi} />
        </div>
    );
}