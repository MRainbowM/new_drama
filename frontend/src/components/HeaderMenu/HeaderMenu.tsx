'use client'
import styles from './HeaderMenu.module.scss'
import Logo from 'public/images/nd.svg'
import Link from 'next/link'
import clsx from "clsx"
import { useCallback, useEffect, useState } from 'react'

interface HeaderMenuProps {
    items: { href: string, title: string }[]
}

export default function HeaderMenu(
    { items }: HeaderMenuProps
) {
    const middleIdx = Math.floor(items.length / 2);
    const leftItems = items.slice(0, middleIdx);
    const rightItems = items.slice(middleIdx, items.length);

    let scrollPoint = 0;

    const [isActive, setActive] = useState(true)


    const onScroll = useCallback(event => {
        const { scrollTop } = document.scrollingElement;

        if (scrollTop > scrollPoint && scrollTop > 0) {
            setActive(false);
        } else {
            setActive(true);
        } 

        scrollPoint = scrollTop;
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll, {});
        }
    }, []);


    return <div
        className={clsx(
            styles.menu,
            { [styles.hide]: !isActive }
        )}
    >
        <div className={styles.leftCol}>
            {leftItems.map(item => (
                <Link href={item.href}>
                    <span>{item.title}</span>
                </Link>
            ))}
        </div>
        <div className={styles.logo}>
            <Link href='/'><Logo /></Link>
        </div>
        <div className={styles.rightCol}>
            {rightItems.map(item => (
                <Link href={item.href}>
                    <span>{item.title}</span>
                </Link>
            ))}
        </div>
    </div>
}