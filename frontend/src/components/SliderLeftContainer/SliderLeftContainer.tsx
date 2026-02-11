'use client'
import styles from './SliderLeftContainer.module.scss'
import Image from 'next/image'
import clsx from "clsx"
import { components } from '../../api/schema'
import Link from 'next/link'

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

            <div className={styles.content}>
                <div className={styles.pictureList}>
                    {data.map((item, index) => (
                        <div
                            className={clsx(
                                styles.picture,
                                { [styles.active]: index === activeItem },
                            )}
                            key={item.id}
                        >
                            <Image
                                className={styles.pictureImg}
                                src={item.cover}
                                layout='fill'
                                alt={item.title}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.mobileSubtitle}>
                    {data.map((item, index) => (
                        <span
                            key={index}
                            className={clsx({ [styles.active]: index == activeItem })}
                        >
                            {item.title}
                        </span>
                    ))}
                </div>

                <div className={styles.mobileTextContainer}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.mobileData,
                                { [styles.active]: index == activeItem }
                            )}
                        >
                            <div
                                className={clsx(
                                    styles.mobileText,
                                    { [styles.active]: index == activeItem }
                                )}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            ></div>
                            <div className={styles.mobileBtn}>
                                <Link
                                    href={item.btn_link}
                                    target='_blank'
                                >
                                    <span>{item.btn_text}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}