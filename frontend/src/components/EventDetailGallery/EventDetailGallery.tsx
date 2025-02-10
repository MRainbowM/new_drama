'use client'
import styles from './EventDetailGallery.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'
import { components } from '../../api/schema'
import Image from 'next/image'

interface EventDetailGalleryProps {
    images: components['schemas']['EventImageOutSchema'][]
}

export default function EventDetailGallery(
    { images }: EventDetailGalleryProps
) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        // dragFree: false,
        // align: 'center'
    });

    return (
        <section className={styles.root}>
            <ArrowLeft emblaApi={emblaApi} />

            <div className={styles.wrap} ref={emblaRef}>
                <div className={styles.list}>
                    {images.map((item, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={styles.item}>
                                <Image
                                    src={item.image}
                                    layout='fill'
                                    priority={true}
                                    alt={'Фотография спектакля'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <ArrowRight emblaApi={emblaApi} />
        </section>
    );
}