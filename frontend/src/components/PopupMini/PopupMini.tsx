import { components } from '../../api/schema';
import PopupTimer from '../PopupTimer/PopupTimer';
import styles from './PopupMini.module.scss';
import Link from 'next/link';

interface PopupMiniProps {
    popup: components['schemas']['PopupOutSchema']
}

export default function PopupMini(
    { popup }: PopupMiniProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <span>{popup.short_title}</span>
            </div>

            <div>
                <PopupTimer
                    endAt={new Date(popup.end_at)}
                    isMini={true}
                />
            </div>

            <div className={styles.btnAction}>
                <Link href={popup.btn_link} target="__blank">
                    <span>{popup.btn_text}</span>
                </Link>
            </div>

        </div>


    );
}