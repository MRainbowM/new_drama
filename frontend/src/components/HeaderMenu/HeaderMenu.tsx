'use client'
import styles from './HeaderMenu.module.scss'
import Logo from 'public/images/nd.svg'
import Link from 'next/link'
import clsx from "clsx"
import { useCallback, useEffect, useRef, useState } from 'react'
import HeaderBurger from '../HeaderBurger/HeaderBurger'

interface HeaderMenuProps {
    items: { href: string, title: string }[]
}

export default function HeaderMenu(
    { items }: HeaderMenuProps
) {
    // Распределение пунктов меню по левую и правую стороны от лого
    const middleIdx = Math.floor(items.length / 2);
    const leftItems = items.slice(0, middleIdx);
    const rightItems = items.slice(middleIdx, items.length);

    // Анимация хедера в десктопе при скролле:
    // вниз - скрыть, вверх - показать
    const scrollPoint = useRef(0);

    const [isActive, setActive] = useState(true);

    const onScroll = useCallback(event => {
        const { scrollTop } = document.scrollingElement;

        if (scrollTop > scrollPoint.current && scrollTop > 0) {
            setActive(false);
        } else {
            setActive(true);
        }

        scrollPoint.current = scrollTop;
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll, {});
        }
    }, [onScroll]);

    // Открыние/закрытие меню в мобилке
    const refContainer = useRef<HTMLElement>();

    const [isOpen, setOpen] = useState(false);
    const onClickBurger = () => {
        setOpen((state) => !state);
    }

    const onClickAccordion = () => {
        setOpen(false);
    }

    useEffect(() => {
        refContainer.current = document.getElementById('container');
        return () => {
            document.body.style.overflow = ''
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (
        <header className={clsx(
            styles.root,
            { [styles.mobileShow]: isOpen }
        )}>
            <div
                className={clsx(
                    styles.menu,
                    { [styles.hide]: !isActive }
                )}

                onClick={onClickAccordion}
            >
                <div className={styles.leftCol}>
                    {leftItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
                <div className={styles.logo}>
                    <Link href='/'><Logo /></Link>
                </div>
                <div className={styles.rightCol}>
                    {rightItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <HeaderBurger
                onClickBurger={onClickBurger}
                isOpen={isOpen}
            />
        </header>
    );
}