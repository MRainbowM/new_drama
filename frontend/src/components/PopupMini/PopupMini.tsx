import { components } from '../../api/schema';
import PopupTimer from '../PopupTimer/PopupTimer';
import styles from './PopupMini.module.scss';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

interface PopupMiniProps {
    popup: components['schemas']['PopupOutSchema'],
    isModalClose: boolean,
    setModalClose: Dispatch<SetStateAction<boolean>>
}

export default function PopupMini(
    { popup, isModalClose, setModalClose }: PopupMiniProps
) {
    const [isClose, setClose] = useState(false);

    const onClickClose = () => {
        setClose(true);
    }

    const openModal = () => {
        setModalClose(false);
    }

    return (<>
        {
            isModalClose && !isClose ? (
                <div className={styles.root}>
                    <div
                        className={styles.title}
                        onClick={openModal}
                    >
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

                    <div
                        className={styles.btnClose}
                        onClick={onClickClose}
                    >
                        <div className={styles.lineTop}></div>
                        <div className={styles.lineBot}></div>
                    </div>
                </div>
            ) : (<></>)
        }
    </>);
}