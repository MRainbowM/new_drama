'use client'
import { components } from '../../api/schema';
import styles from './PopupModal.module.scss';
import Link from 'next/link';

interface PopupModalProps {
    popup: components['schemas']['PopupOutSchema']
}

export default async function PopupModal(
    { popup }: PopupModalProps
) {
    return (
        <div className={styles.root}>

            <div className={styles.modal}>
                <div className={styles.topRow}>
                    <div className={styles.btnClose}>
                        <div className={styles.lineTop}></div>
                        <div className={styles.lineBot}></div>
                    </div>

                </div>

                <div className={styles.content}>
                    <div className={styles.title}>
                        {popup.title}
                    </div>
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: popup.content }}
                    >
                    </div>
                    <div className={styles.btnAction}>
                        <Link href={popup.btn_link} >
                            <span>{popup.btn_text}</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}