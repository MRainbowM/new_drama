'use client'
import styles from './ScheduleCursor.module.scss'
import React, { useRef, useEffect, useState } from 'react';
import clsx from "clsx"
import myImageLoader from '../../loaders/image-loader'

interface ScheduleCursorProps {
    isActive: boolean,
    cover: string
}

export default function ScheduleCursor(
    { isActive, cover }: ScheduleCursorProps
) {
    const backgroundImageSrc = cover ? myImageLoader({ src: cover }) : '';
    const cursorSchedule = useRef<HTMLDivElement>(null);

    // Слежение курсора за мышкой
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

    // Проверка на поддержку ховеров
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: none)");
        setIsTouch(mediaQuery.matches);

        // Следим за изменениями (например, подключение мыши к планшету)
        const handler = (e) => setIsTouch(e.matches);
        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Предзагрузка 
    useEffect(() => {
        if (!isTouch) {
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
        }
    }, [backgroundImageSrc, isTouch]);

    useEffect(() => {
        cursorSchedule.current.style.backgroundImage = isActive ? `url(${backgroundImageSrc})` : '';
    }, [isActive]);

    return (
        <div
            ref={cursorSchedule}
            className={clsx(
                styles.root,
                { [styles.active]: isActive }
            )}
        >
        </div>
    );
}