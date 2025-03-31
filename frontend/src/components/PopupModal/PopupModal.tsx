'use client'
import { components } from '../../api/schema';
import styles from './PopupModal.module.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import PopupTimer from '../PopupTimer/PopupTimer';
import PopupMini from '../PopupMini/PopupMini';
import Cookies from 'js-cookie';

interface PopupModalProps {
    popup: components['schemas']['PopupOutSchema']
}

export default function PopupModal(
    { popup }: PopupModalProps
) {
    const [isClose, setClose] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, [])

    useEffect(() => {
        setClose(Cookies.get('isClosePopup') || false); // Читаем куку только на клиенте
    }, []);

    const saveToCookies = () => {
        Cookies.set('isClosePopup', isClose, { expires: 1, path: "/" });
    };

    const onClickClose = () => {
        setClose(true);
        saveToCookies();
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

    if (!isVisible) return;

    return (
        <>
            <div
                className={clsx(
                    styles.root,
                    { [styles.close]: isClose }
                )}
            >
                <div className={styles.modal} ref={refModal}>
                    <div className={styles.coverCol} >
                        <Image
                            className={styles.cover}
                            src={popup.cover}
                            width={500}
                            height={500}
                            priority={true}
                            alt={popup.title}
                        />
                    </div>

                    <div className={styles.contentCol}>
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
                            {
                                popup.subtitle ? (
                                    <div className={styles.subtitle}>
                                        {popup.subtitle}
                                    </div>
                                ) : (<></>)
                            }
                            <div className={styles.title}>
                                {popup.title}
                            </div>
                            <div
                                className={styles.text}
                                dangerouslySetInnerHTML={{ __html: popup.content }}
                            >
                            </div>
                            <PopupTimer endAt={popup.end_at} onEnd={() => setIsVisible(false)} />
                            <div className={styles.btnAction}>
                                <Link href={popup.btn_link} target="__blank">
                                    <span>{popup.btn_text}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PopupMini
                popup={popup}
                isModalClose={isClose}
                setModalClose={setClose}
            />
        </>
    );
}