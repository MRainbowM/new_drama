'use client'
import styles from './TheaterSection.module.scss'
import TheaterSVG from 'public/images/theater.svg'
import TheaterMobileSVG from 'public/images/theater_mobile.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function TheaterSection() {
    // Брейкпоинт мобильной версии
    const mobileWidth = 700;

    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        if(window.innerWidth <=mobileWidth) {
            setMobile(true);
        } else {
            setMobile(false);
        }    
    }, []);

    return (
        <div className={styles.root}>
            {
                isMobile ? (
                    <TheaterMobileSVG />
                ) : (
                    <TheaterSVG />
                )
            }
        </div>
    );
}