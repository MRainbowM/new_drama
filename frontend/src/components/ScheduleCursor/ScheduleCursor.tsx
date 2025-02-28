'use client'
import styles from './ScheduleCursor.module.scss'
import React, { useRef, useEffect, useState } from 'react';
import clsx from "clsx"
import myImageLoader from '../../loaders/image-loader'

interface ScheduleCursorProps {
    isActive: boolean,
    cover: string,
    eventId: number
}

export default function ScheduleCursor(
    { isActive, cover, eventId }: ScheduleCursorProps
) {
    const backgroundImageSrc = cover ? myImageLoader({ src: cover }) : '';
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
    }, []);

    useEffect(() => {
        // Проверяем, что cover не пустой
        if (!backgroundImageSrc) return;

        const link = document.createElement("link");
        link.rel = "preload";
        link.href = backgroundImageSrc;
        link.as = "image";
        document.head.appendChild(link);

        return () => {
            // Удаляем, если компонент размонтируется
            document.head.removeChild(link);
        };

    }, [backgroundImageSrc]);

    const [background, setBackground] = useState("");
    useEffect(() => {
        const cachedBg = localStorage.getItem(`eventCursor${eventId}`);

        if (cachedBg) {
            setBackground(cachedBg);
        } else {
            const imgSrc = backgroundImageSrc;
            localStorage.setItem(`eventCursor${eventId}`, imgSrc);
            setBackground(imgSrc);
        }
    }, [backgroundImageSrc]);


    useEffect(() => {
        // cursorSchedule.current.style.backgroundImage = isActive ? `url(${backgroundImageSrc})` : '';
        cursorSchedule.current.style.backgroundImage = isActive ? `url(${background})` : '';
    }, [isActive]);

    return (
        <div
            ref={cursorSchedule}
            className={clsx(
                styles.root,
                { [styles.active]: isActive }
            )}
        // style={{ backgroundImage: `url(${backgroundImageSrc})` }}
        >
        </div>
    );
}