'use client'
import styles from './SliderLeftContainer.module.scss'
import Image from 'next/image'
import clsx from "clsx"
import { components } from '../../api/schema'


interface SliderLeftContainerProps {
    activeItem: number,
    data: components['schemas']['InfoBlockOutSchema'][]
}

export default function SliderLeftContainer(
    { activeItem, data }: SliderLeftContainerProps
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
                        {data.map((item, index) => (
                            <div className={styles.imgSquare}>
                                <Image
                                    className={clsx(
                                        { [styles.active]: index == activeItem }
                                    )}
                                    src={item.cover}
                                    width={500}
                                    height={500}
                                    alt={item.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}