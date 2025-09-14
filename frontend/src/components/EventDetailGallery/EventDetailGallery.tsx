'use client'
import styles from './EventDetailGallery.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import ArrowLeft from '../ArrowLeft/ArrowLeft'
import ArrowRight from '../ArrowRight/ArrowRight'
import { components } from '../../api/schema'
import Image from 'next/image'
import Lightbox from "yet-another-react-lightbox";
import * as React from "react";
import NextJsImage from '../../libs/NextJsImage/NextJsImage'
import "yet-another-react-lightbox/styles.css";

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

    // Просмотр фоток
    const [open, setOpen] = React.useState(false);
    const [openIndex, setOpenIndex] = React.useState(0);

    const slides = [];

    images.forEach((img) => slides.push({
        src: img.image,
        height: 100,
        width: 100
    }));

    const onClickImg = (index: number) => {
        setOpenIndex(index);
        setOpen(true);
    }

    return (
        <section className={styles.root}>
            <ArrowLeft emblaApi={emblaApi} />

            <div className={styles.wrap} ref={emblaRef}>
                <div className={styles.list}>
                    {images.map((item, index) => (
                        <div
                            className={styles.slide}
                            key={index}
                            onClick={() => onClickImg(index)}
                        >
                            <div className={styles.item}>
                                <Image
                                    src={item.image_compressed_url}
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

            <Lightbox
                index={openIndex}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                render={{ slide: NextJsImage }}
            />
        </section>
    );
}