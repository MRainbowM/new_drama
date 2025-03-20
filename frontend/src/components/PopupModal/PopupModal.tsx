'use client'
import { components } from '../../api/schema';
import styles from './PopupModal.module.scss';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface PopupModalProps {
    popup: components['schemas']['PopupOutSchema']
}

export default function PopupModal(
    { popup }: PopupModalProps
) {
    const [isClose, setClose] = useState(false);

    const onClickClose = () => {
        setClose(true);
    }

    // При клике вне модалки - закрывать ее
    const refModal = useRef<HTMLDivElement>();

    useEffect(() => {
        function handleClick(event) {
            if (refModal.current && !refModal.current.contains(event.target)) {
                onClickClose();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [onClickClose]);

    return (
        <div
            className={clsx(
                styles.root,
                { [styles.close]: isClose }
            )}
        >

            <div className={styles.modal} ref={refModal}>
                <div className={styles.topRow}>
                    <div
                        className={styles.btnClose}
                        onClick={onClickClose}
                    >
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
                        <Link href={popup.btn_link} target="__blank">
                            <span>{popup.btn_text}</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}