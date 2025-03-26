'use client';
import { useEffect, useState } from 'react';
import styles from './PopupTimer.module.scss';
import { declensionOfHours, declensionOfMinutes } from '../../services/declensionOfNumerals';
import clsx from 'clsx';

interface PopupTimerProps {
    endAt: Date, // Дата и время окончания таймера
    isMini?: boolean  // Размер таймера 
}

export default function PopupTimer(
    { endAt, isMini }: PopupTimerProps
) {
    const [tick, setTick] = useState(false);
    const [[diffDays, diffHours, diffMinutes, diffSeconds], setDiff] = useState([0, 0, 0, 0]);

    const [[titleHours, titleMinutes], setTitle] = useState(['часов', 'минут']);

    useEffect(() => {
        const currentDate = new Date();
        let diff = (endAt.getTime() - currentDate.getTime()) / 1000;

        if (diff < 0) diff = 0; // Время вышло

        setDiff([
            Math.floor(diff / 86400), // Дни
            Math.floor((diff / 3600) % 24),
            Math.floor((diff / 60) % 60),
            Math.floor(diff % 60)
        ]);

        setTitle([
            declensionOfHours({ currentNumber: diffHours }),
            declensionOfMinutes({ currentNumber: diffMinutes })
        ]);
    }, [tick, endAt])

    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 1000);
        return () => clearInterval(timerID);
    }, [tick])

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