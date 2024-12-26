'use client'
import styles from './SliderLeftContainer.module.scss'
import Image from 'next/image'
import RestImg from 'public/images/rest.png'
import RoomImg from 'public/images/room.png'
import TestImg from 'public/images/pp-67.jpg'
import clsx from "clsx"

interface SliderLeftContainerProps {
    activeItem: number
}

export default function SliderLeftContainer(
    { activeItem }: SliderLeftContainerProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <h2>В наших стенах</h2>
            </div>

            <div className={styles.coverContainer}>
                <div className={styles.cover}>
                    <div
                        className={styles.coverWrap}
                        style={{ top: `${activeItem * (-100)}%` }}
                    >
                        <div className={styles.imgSquare}>
                            <Image
                                className={clsx(
                                    { [styles.active]: 0 == activeItem }
                                )}
                                src={RestImg.src}
                                width={500}
                                height={500}
                                alt={''}
                            />
                        </div>

                        <div className={styles.imgSquare}>
                            <Image
                                className={clsx(
                                    { [styles.active]: 1 == activeItem }
                                )}
                                src={RoomImg.src}
                                width={500}
                                height={500}
                                alt={''}
                            />
                        </div>

                        <div className={styles.imgSquare}>
                            <Image
                                className={clsx(
                                    { [styles.active]: 2 == activeItem }
                                )}
                                src={TestImg.src}
                                width={500}
                                height={500}
                                alt={''}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}