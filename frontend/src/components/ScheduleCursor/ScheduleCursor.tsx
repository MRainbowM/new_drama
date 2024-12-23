'use client'
import styles from './ScheduleCursor.module.scss'
import React, { useRef, useEffect } from 'react';
import clsx from "clsx"

interface ScheduleCursorProps {
    isActive: boolean,
    cover: string
}

export default function ScheduleCursor(
    { isActive, cover }: ScheduleCursorProps
) {
    const cursorsReview = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorsReview.current.style.left = (e.clientX - 250) + 'px';
            cursorsReview.current.style.top = (e.clientY - 150) + 'px';
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [])

    return (
        <div
            ref={cursorsReview}
            className={clsx(
                styles.root,
                { [styles.active]: isActive }
            )}
            style={{ backgroundImage: `url(http://0.0.0.0:8011/${cover})` }}
        >
        </div>
    );
}