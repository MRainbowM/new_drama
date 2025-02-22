'use client'
import styles from './ReviewList.module.scss'
import { components } from '../../api/schema'
import useEmblaCarousel from 'embla-carousel-react'
import ReviewItem from '../ReviewItem/ReviewItem'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'
import * as React from "react";
import NextJsImage from '../NextJsImage/NextJsImage'
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

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


    // Просмотр фоток
    const [open, setOpen] = React.useState(false);
    const [openIndex, setOpenIndex] = React.useState(0);

    const slides = [];

    reviewList.forEach((review) => slides.push({
        src: review.image,
        height: 100,
        width: 100
    }));

    const onClickImg = (index: number) => {
        setOpenIndex(index);
        setOpen(true);
    }

    return (
        <div className={styles.root}>
            <ArrowLeft emblaApi={emblaApi} />

            <div className={styles.wrap} ref={emblaRef}>
                <div className={styles.list}>
                    {reviewList.map((item, index) => (
                        <ReviewItem
                            index={index}
                            review={item}
                            onClickImg={onClickImg}
                        />
                    ))}
                </div>
            </div>

            <ArrowRight emblaApi={emblaApi} />

            <Lightbox
                index={openIndex}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                render={{ slide: NextJsImage }}
            />
        </div>
    );
}