import styles from './SliderItem.module.scss'
import { useInView } from "react-intersection-observer";
import React, { useEffect, useMemo, useState } from 'react';
import { components } from '../../api/schema'
import clsx from 'clsx';

type TextLine =
    | { type: 'p'; html: string }
    | { type: 'li'; html: string };

function splitRichTextToLines(html: string): TextLine[] {
    if (!html) return [];

    // Берём только параграфы и пункты списков, сохраняя порядок появления.
    const re = /<(p|li)\b[^>]*>[\s\S]*?<\/\1>/gi;
    const matches = Array.from(html.matchAll(re));
    if (matches.length === 0) {
        // Фоллбек: показываем как одну строку
        return [{ type: 'p', html }];
    }

    return matches.map((m) => {
        const tag = (m[1] || '').toLowerCase();
        const outer = m[0] || '';
        if (tag === 'li') {
            const inner = outer
                .replace(/^<li\b[^>]*>/i, '')
                .replace(/<\/li>$/i, '');
            return { type: 'li', html: inner };
        }
        return { type: 'p', html: outer };
    });
}

interface SliderItemProps {
    data: components['schemas']['InfoBlockOutSchema'],
    isActive: boolean,
    onView?: () => void,
    variant?: 'content' | 'trigger'
}

export default function SliderItem(
    { onView, data, isActive, variant = 'content' }: SliderItemProps
) {
    const isTrigger = variant === 'trigger';
    const { ref, inView } = useInView({
        // Процент видимости блока
        threshold: 0.72
    });

    const [hasBeenInView, setHasBeenInView] = useState(false);
    const [shouldReveal, setShouldReveal] = useState(false);

    useEffect(() => {
        if (!isTrigger) return;
        if (!onView) return;
        if (inView) {
            setHasBeenInView(true);
            onView();
        }
    }, [inView, onView, isTrigger]);

    useEffect(() => {
        if (isTrigger) return;
        setShouldReveal(false);
        const raf = requestAnimationFrame(() => setShouldReveal(true));
        return () => cancelAnimationFrame(raf);
    }, [data.id, isTrigger]);

    const isRevealed = useMemo(() => {
        if (!isTrigger) return shouldReveal;
        // На десктопе — раскрываем по факту появления.
        // На мобилке — ещё и по активному элементу (переключение слева).
        return hasBeenInView || inView || isActive;
    }, [hasBeenInView, inView, isActive, isTrigger, shouldReveal]);

    const lines = useMemo(() => splitRichTextToLines(data.content), [data.content]);

    if (isTrigger) {
        return (
            <div
                className={styles.triggerRoot}
                ref={ref}
                id={data.menu_title_slug}
            />
        );
    }

    return (
        <div className={clsx(styles.root,
            isActive && styles.mobileOnView,
            isRevealed && styles.revealed
        )}
            data-anchor={data.menu_title_slug}
        >
            <div className={styles.container}>
                <div className={styles.content}>
                    <h3>
                        <span className={styles.titleMask}>
                            <span className={styles.titleInner}>{data.title}</span>
                        </span>
                    </h3>

                    <div className={styles.textMask}>
                        <div className={styles.text}>
                            {lines.map((line, index) => {
                                const style = {
                                    ['--line-delay' as any]: `${index * 90}ms`,
                                };

                                if (line.type === 'li') {
                                    return (
                                        <div key={index} className={styles.lineMask} style={style}>
                                            <div className={styles.lineInner}>
                                                <span className={styles.bullet}>—</span>
                                                <span
                                                    className={styles.lineContent}
                                                    dangerouslySetInnerHTML={{ __html: line.html }}
                                                />
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={index} className={styles.lineMask} style={style}>
                                        <div
                                            className={styles.lineInner}
                                            dangerouslySetInnerHTML={{ __html: line.html }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.btnRow}>
                        <a
                            className={styles.btn}
                            href={data.btn_link}
                            target='_blank'
                        >
                            <span>{data.btn_text}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}