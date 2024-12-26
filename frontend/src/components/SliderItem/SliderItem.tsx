import styles from './SliderItem.module.scss'
import { useInView } from "react-intersection-observer";
import React, { useRef, useEffect } from 'react';
import { MouseParallax, ScrollParallax } from "react-just-parallax";


interface SliderItemProps {
    onView: () => void,
    color: string,
    title: string
}

export default function SliderItem(
    { onView, color, title }: SliderItemProps
) {

    const { ref, inView, entry } = useInView({
        threshold: 0.75
    });

    useEffect(() => { if (inView) { onView(); } }, [inView])

    return (
        <div className={styles.root}
            // style={{ background: color }}
            ref={ref}
        >
            <ScrollParallax>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h3>{title}</h3>

                        <div className={styles.text}>
                            <p>Один из главных театральных реформаторов Константин Сергеевич Станиславский, разрабатывая тренинги для своей Системы, постигал философию индийских йогов с их учениями о пране – таинственной душевной субстанции, которая связывает человека с космосом.</p>
                            <p>Первая студия Художественного театра читала систему «Хатха-йоги» и пробовала на себе практики, связанные с дыханием и с высвобождением своей внутренней энергии в пространство. </p>
                        </div>

                        <div className={styles.btnRow}>
                            <div className={styles.btn}>
                                <span>Написать в Telegram</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollParallax>
        </div>
    );
}