'use client';
import styles from './Hero.module.scss';
import NDlarge from 'public/images/hero_2.svg?url';
import NDsmall from 'public/images/hero_m.svg?url';
import PosterImg from 'public/images/hero_poster.png';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Observer для отслеживания видимости видео
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 } // Считаем видео видимым, если оно наполовину в зоне видимости
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                videoRef.current?.pause();
            } else if (isVisible) {
                videoRef.current?.play();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [isVisible]);

    return (
        <div className={styles.root}>
            <div className={styles.mainVideo} >
                <video
                    ref={videoRef}
                    className={styles.bgVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="Video player"
                    poster={PosterImg.src}
                    style={{
                        '--mask-large': `url(${NDlarge.src})`,
                        '--mask-small': `url(${NDsmall.src})`,
                    } as React.CSSProperties}
                >
                    <source src="/api/video?is_mobile=true" type="video/mp4" media="(max-width:700px)" />
                    <source src="/api/video?is_mobile=false" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}