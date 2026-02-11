'use client'
import styles from './SliderLeftContainer.module.scss'
import Image from 'next/image'
import clsx from "clsx"
import { components } from '../../api/schema'
import Link from 'next/link'

type TextLine =
    | { type: 'p'; html: string }
    | { type: 'li'; html: string };

function splitRichTextToLines(html: string): TextLine[] {
    if (!html) return [];

    const re = /<(p|li)\b[^>]*>[\s\S]*?<\/\1>/gi;
    const matches = Array.from(html.matchAll(re));
    if (matches.length === 0) {
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

interface SliderLeftContainerProps {
    activeItem: number,
    data: components['schemas']['InfoBlockOutSchema'][]
}

export default function SliderLeftContainer(
    { activeItem, data }: SliderLeftContainerProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <h2>В наших стенах</h2>
            </div>

            <div className={styles.content}>
                <div className={styles.pictureList}>
                    {data.map((item, index) => (
                        <div
                            className={clsx(
                                styles.picture,
                                { [styles.active]: index === activeItem },
                            )}
                            key={item.id}
                        >
                            <Image
                                className={styles.pictureImg}
                                src={item.cover_compressed_url}
                                layout='fill'
                                alt={item.title}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.mobileSubtitle}>
                    {data.map((item, index) => (
                        <span
                            key={index}
                            className={clsx({ [styles.active]: index == activeItem })}
                        >
                            {item.title}
                        </span>
                    ))}
                </div>

                <div className={styles.mobileTextContainer}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.mobileData,
                                { [styles.active]: index == activeItem }
                            )}
                        >
                            <div className={styles.mobileText}>
                                {splitRichTextToLines(item.content).map((line, lineIndex) => {
                                    const style = {
                                        ['--line-delay' as any]: `${lineIndex * 90}ms`,
                                    };

                                    if (line.type === 'li') {
                                        return (
                                            <div key={lineIndex} className={styles.mobileLineMask} style={style}>
                                                <div className={styles.mobileLineInner}>
                                                    <span className={styles.mobileBullet}>—</span>
                                                    <span
                                                        className={styles.mobileLineContent}
                                                        dangerouslySetInnerHTML={{ __html: line.html }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={lineIndex} className={styles.mobileLineMask} style={style}>
                                            <div
                                                className={styles.mobileLineInner}
                                                dangerouslySetInnerHTML={{ __html: line.html }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.mobileBtn}>
                                <Link
                                    href={item.btn_link}
                                    target='_blank'
                                >
                                    <span>{item.btn_text}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}