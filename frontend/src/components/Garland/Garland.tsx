import styles from './Garland.module.scss';
import clsx from 'clsx';

const BULB_COUNT = 16;
const COLORS = ['#e3f6ff', '#9fd6e8', '#ffffff'] as const;

interface GarlandProps {
    hidden?: boolean;
}

export default function Garland({ hidden = false }: GarlandProps) {
    return (
        <div
            className={clsx(styles.root, { [styles.hidden]: hidden })}
            aria-hidden
        >
            <div className={styles.wire} />
            <div className={styles.bulbs}>
                {Array.from({ length: BULB_COUNT }, (_, i) => {
                    const color = COLORS[i % COLORS.length];
                    return (
                        <span
                            key={i}
                            className={styles.bulb}
                            style={{
                                backgroundColor: color,
                                color,
                                animationDelay: `${(i * 0.17) % 2}s`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
