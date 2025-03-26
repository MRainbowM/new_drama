'use client';
import { useEffect, useState } from 'react';
import styles from './PopupTimer.module.scss';
import { declensionOfHours, declensionOfMinutes } from '../../services/declensionOfNumerals';
import clsx from 'clsx';

interface PopupTimerProps {
    endAt: string, // Дата и время окончания таймера
    isMini?: boolean  // Размер таймера 
    onEnd?: () => void
}

export default function PopupTimer(
    { endAt, isMini, onEnd }: PopupTimerProps
) {
    const [tick, setTick] = useState(false);

    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 1000);
        return () => clearInterval(timerID);
    }, [tick])

    const endAtDate = new Date(endAt);
    const currentDate = new Date();
    const diff = (endAtDate.getTime() - currentDate.getTime()) / 1000;

    if (diff < 0) {
        onEnd?.()
        return null;
    }

    const diffHours = Math.floor((diff / 3600) % 24)
    const diffMinutes = Math.floor((diff / 60) % 60)
    const diffSeconds = Math.floor(diff % 60)

    const titleHours = declensionOfHours({ currentNumber: diffHours })
    const titleMinutes = declensionOfMinutes({ currentNumber: diffMinutes })

    return (
        <div
            className={clsx(
                styles.root,
                { [styles.mini]: isMini },
                { [styles.default]: !isMini }
            )}
        >
            <div className={styles.col}>
                <span className={styles.number}>
                    {diffHours.toString().padStart(2, '0')}
                </span>
                <span className={styles.title}>{titleHours}</span>
            </div>
            <div className={styles.col}>
                <span>:</span>
            </div>
            <div className={styles.col}>
                <span className={styles.number}>
                    {diffMinutes.toString().padStart(2, '0')}
                </span>
                <span className={styles.title}>{titleMinutes}</span>
            </div>
            <div className={styles.col}>
                <span>:</span>
            </div>
            <div className={styles.col}>
                <span className={styles.number}>
                    {diffSeconds.toString().padStart(2, '0')}
                </span>
                <span className={styles.title}>{'секунд'}</span>
            </div>
        </div>
    );
}