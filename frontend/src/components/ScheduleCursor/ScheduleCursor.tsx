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
    const cursorSchedule = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorSchedule.current.style.left = (e.clientX - 250) + 'px';
            cursorSchedule.current.style.top = (e.clientY - 150) + 'px';
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [])

    return (
        <div
            ref={cursorSchedule}
            className={clsx(
                styles.root,
                { [styles.active]: isActive }
            )}
            style={{ backgroundImage: `url(${cover})` }}
        >
        </div>
    );
}