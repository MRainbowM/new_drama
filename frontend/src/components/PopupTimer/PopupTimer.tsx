'use client';
import { useEffect, useState } from 'react';
import styles from './PopupTimer.module.scss';
import { declensionOfHours, declensionOfMinutes } from '../../services/declensionOfNumerals';

interface PopupTimerProps {
    end_at: Date // Дата и время окончания таймера
}

export default function PopupTimer(
    { end_at }: PopupTimerProps
) {
    const [tick, setTick] = useState(false);
    const [[diffDays, diffHours, diffMinutes, diffSeconds], setDiff] = useState([0, 0, 0, 0]);

    const [[titleHours, titleMinutes], setTitle] = useState(['', '']);

    useEffect(() => {
        const currentDate = new Date();
        const diff = (end_at.getTime() - currentDate.getTime()) / 1000;

        if (diff < 0) return null; // Время вышло

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
    }, [tick, end_at])

    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 1000);
        return () => clearInterval(timerID);
    }, [tick])

    return (
        <div className={styles.root}>
            <div className={styles.col}>
                <span>{diffHours.toString().padStart(2, '0')}</span>
                <span className={styles.title}>{titleHours}</span>
            </div>
            <div className={styles.col}>
                <span>:</span>
            </div>
            <div className={styles.col}>
                <span>{diffMinutes.toString().padStart(2, '0')}</span>
                <span className={styles.title}>{titleMinutes}</span>
            </div>
            <div className={styles.col}>
                <span>:</span>
            </div>
            <div className={styles.col}>
                <span>{diffSeconds.toString().padStart(2, '0')}</span>
                <span className={styles.title}>{'секунд'}</span>
            </div>

        </div>




    );

}