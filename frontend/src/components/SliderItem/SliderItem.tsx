import styles from './SliderItem.module.scss'
import { useInView } from "react-intersection-observer";
import React, { useEffect } from 'react';
import { ScrollParallax } from "react-just-parallax";
import { components } from '../../api/schema'

interface SliderItemProps {
    onView: () => void,
    data: components['schemas']['InfoBlockOutSchema']
}

export default function SliderItem(
    { onView, data }: SliderItemProps
) {

    const { ref, inView, entry } = useInView({
        threshold: 0.75 // Процент видимости блока
    });

    useEffect(() => { if (inView) { onView(); } }, [inView])

    return (
        <div className={styles.root}
            ref={ref}
        >
            <ScrollParallax>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h3>{data.title}</h3>

                        <div
                            className={styles.text}
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        >
                        </div>

                        <div className={styles.btnRow}>
                            <a
                                className={styles.btn}
                                href={data.btn_link}
                                target='_blank'
                            >
                                <span>{data.btn_text}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </ScrollParallax>
        </div>
    );
}