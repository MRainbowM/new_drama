import { MouseEventHandler } from 'react';
import styles from './HeaderBurger.module.scss'
import clsx from "clsx"

interface HeaderBurgerProps {
    onClickBurger: MouseEventHandler,
    isOpen: boolean
}

export default function HeaderBurger(
    { onClickBurger, isOpen }: HeaderBurgerProps
) {
    return (
        <div className={styles.burger} onClick={onClickBurger}>
            <div className={clsx(styles.lineTop, { [styles.open]: isOpen })}></div>
            <div className={clsx(styles.lineMid, { [styles.open]: isOpen })}></div>
            <div className={clsx(styles.lineBot, { [styles.open]: isOpen })}></div>
        </div>
    );
}