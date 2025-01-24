'use client'
import { components } from '../../api/schema'
import styles from './PartnerList.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'
import PartnerItem from '../PartnerItem/PartnerItem'

interface PartnerListProps {
    partnerList: components['schemas']['PartnerOutSchema'][]
}

export default function PartnerList(
    { partnerList }: PartnerListProps
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
                    {partnerList.map((item, index) => (
                        <PartnerItem
                            key={item.id}
                            partner={item}
                        />
                    ))}
                </div>
            </div>

            <ArrowRight emblaApi={emblaApi} />

        </div>
    );
}