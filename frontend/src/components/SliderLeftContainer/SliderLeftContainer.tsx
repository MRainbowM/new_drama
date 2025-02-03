'use client'
import styles from './SliderLeftContainer.module.scss'
import Image from 'next/image'
import clsx from "clsx"
import { components } from '../../api/schema'
import { useCallback, useEffect, useRef, useState } from 'react'
import SliderLeftMobile from '../SliderLeftMobile/SliderLeftMobile'

interface SliderLeftContainerProps {
    activeItem: number,
    data: components['schemas']['InfoBlockOutSchema'][]
}

export default function SliderLeftContainer(
    { activeItem, data }: SliderLeftContainerProps
) {
    const refRoot = useRef<HTMLDivElement>();
    const refCover = useRef<HTMLDivElement>();
    const [offsetImg, setOffsetImg] = useState(0);
    const [topImg, setTopImg] = useState(0);
    const mobileWidth = 700; // Брейкпоинт мобильной версии

    const onScroll = useCallback(event => {
        if (window.innerWidth < mobileWidth) {
            // Мобильная версия
            setTopImg(0);

            const { top } = refRoot.current.closest('section').getBoundingClientRect();
            if (top < 0) {
                const maxImgTop = (refCover.current.offsetHeight / data.length * (data.length - 1))
                setOffsetImg(Math.max(top * 0.5, -maxImgTop))
            } else {
                setOffsetImg(0);
            }
        } else {
            // Десктоп
            setOffsetImg(0);
            setTopImg(activeItem * -100);
        }

    }, [activeItem, data]);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll, {});
        }
    }, [onScroll]);

    return (
        <div className={styles.root} ref={refRoot}>
            <div className={styles.title}>
                <h2>В наших стенах</h2>
            </div>

            <div className={styles.coverContainer}>
                <div className={styles.cover}>
                    <div
                        className={styles.coverWrap}
                        ref={refCover}
                        style={{
                            top: `${topImg}%`,
                            transform: `translateY(${offsetImg}px)`
                        }}

                    >
                        {data.map((item, index) => (
                            <div
                                className={styles.imgSquare}
                                key={item.id}
                            >
                                <Image
                                    className={clsx(
                                        { [styles.active]: index == activeItem }
                                    )}
                                    src={item.cover}
                                    layout='fill'
                                    alt={item.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {data.map((item, index) => (
                <SliderLeftMobile
                    key={index}
                    currentItemIdx={index}
                    activeItem={activeItem}
                    item={item}
                />
            ))}
        </div>
    );
}