'use client'
import React, { useState, useEffect } from 'react';
import styles from './YandexMap.module.scss';


export default function YandexMap() {
    const [isLoaded, setIsLoaded] = useState(false);
    const oid = process.env.NEXT_PUBLIC_YANDEX_MAP_OID;
    const mapSrc = `https://yandex.ru/map-widget/v1/?z=15&ol=biz&oid=${oid}`;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.mapContainer}>
            {!isLoaded && <div className={styles.loader}>Загрузка карты...</div>}
            {isLoaded && (
                <iframe
                    src={mapSrc}
                    className={styles.mapFrame}
                    allowFullScreen
                    loading='lazy'
                    title='Карта Яндекса'
                ></iframe>
            )}
        </div>
    );
};
