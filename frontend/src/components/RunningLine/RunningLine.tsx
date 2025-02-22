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
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>                   
                </div>

                <div aria-hidden="true" className={styles.items}>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>           
                </div>
            </div>
        </div>
    );
}