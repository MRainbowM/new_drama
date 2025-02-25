'use client'

import { usePathname } from 'next/navigation';
import styles from './RunningLine.module.scss'


export default function RunningLine() {
    const pathname = usePathname()

    if (pathname !== '/') return null

    return (
        <div className={styles.root}>
            <div className={styles.wrap}>
                <div className={styles.items}>
                    <span className={styles.item}>Номинант премии «золотая маска»</span>
                    <span className={styles.item}>Forbes Russia'23 TOP-10</span>
                    <span className={styles.item}>Коляда-Plays</span>
                    <span className={styles.item}>Первый фестиваль независимых театров</span>
                    <span className={styles.item}>Территория. Иркутск</span>
                    <span className={styles.item}>Территория. Красноярск</span>
                    <span className={styles.item}>Территория. Магадан</span>
                </div>

                <div aria-hidden="true" className={styles.items}>
                    <span className={styles.item}>Номинант премии «золотая маска»</span>
                    <span className={styles.item}>Forbes Russia'23 TOP-10</span>
                    <span className={styles.item}>Коляда-Plays</span>
                    <span className={styles.item}>Первый фестиваль независимых театров</span>
                    <span className={styles.item}>Территория. Иркутск</span>
                    <span className={styles.item}>Территория. Красноярск</span>
                    <span className={styles.item}>Территория. Магадан</span>
                </div>
            </div>
        </div>
    );
}