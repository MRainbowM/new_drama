'use client';

import { useEffect, useRef } from 'react';
import styles from './Snowfall.module.scss';

const DESKTOP_COUNT = 60;
const MOBILE_COUNT = 30;
const MOBILE_BREAKPOINT = 700;

type Flake = {
    x: number;
    y: number;
    radius: number;
    speed: number;
    drift: number;
    opacity: number;
};

function createFlake(width: number, height: number, fromTop = false): Flake {
    return {
        x: Math.random() * width,
        y: fromTop ? -8 : Math.random() * height,
        radius: 1 + Math.random() * 2.5, // диаметр ~2–7 px
        speed: 0.3 + Math.random() * 0.7,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: 0.4 + Math.random() * 0.6,
    };
}

export default function Snowfall() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let flakes: Flake[] = [];
        let animationId = 0;
        let width = 0;
        let height = 0;

        const getCount = () =>
            window.innerWidth <= MOBILE_BREAKPOINT
                ? MOBILE_COUNT
                : DESKTOP_COUNT;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = getCount();
            if (flakes.length !== count) {
                flakes = Array.from({ length: count }, () =>
                    createFlake(width, height)
                );
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (const flake of flakes) {
                flake.y += flake.speed;
                flake.x += flake.drift;

                if (flake.y - flake.radius > height) {
                    Object.assign(flake, createFlake(width, height, true));
                }
                if (flake.x < -8) flake.x = width + 8;
                if (flake.x > width + 8) flake.x = -8;

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.root}
            aria-hidden
        />
    );
}
