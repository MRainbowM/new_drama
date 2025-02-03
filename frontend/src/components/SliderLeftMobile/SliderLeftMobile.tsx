import styles from './SliderLeftMobile.module.scss'
import clsx from "clsx"
import { components } from '../../api/schema'

interface SliderLeftMobileProps {
    activeItem: number,
    currentItemIdx: number,
    item: components['schemas']['InfoBlockOutSchema']
}
export default function SliderLeftMobile(
    { activeItem, currentItemIdx, item }: SliderLeftMobileProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.subtitleContainer}>
                <span
                    className={clsx(
                        styles.subtitle,
                        { [styles.active]: currentItemIdx == activeItem }
                    )}
                >
                    {item.title}
                </span>
            </div>
            <div className={styles.textContainer}>
                <div
                    className={clsx(
                        styles.text,
                        { [styles.active]: currentItemIdx == activeItem }
                    )}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                >
                </div>
            </div>
            <div className={styles.btnContainer}>
                <div
                    className={clsx(
                        styles.btn,
                        { [styles.active]: currentItemIdx == activeItem }
                    )}
                >
                    <a
                        href={item.btn_link}
                        target='_blank'
                    >
                        <span>{item.btn_text}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}