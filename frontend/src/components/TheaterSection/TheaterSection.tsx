import styles from './TheaterSection.module.scss'
import TheaterSVG from 'public/images/theater.svg'

export default function TheaterSection() {
    return (
        <div className={styles.root}>
            <TheaterSVG />
        </div>
    );
}