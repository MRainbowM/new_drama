import styles from './ArrowLeft.module.scss'
import { EmblaCarouselType } from 'embla-carousel';
import Arrow from 'public/images/arrow.svg'

interface ArrowLeftProps {
    emblaApi: EmblaCarouselType
}


export default function ArrowLeft(
    { emblaApi }: ArrowLeftProps
) {
    return (
        <div className={styles.arrowLeft}>
            <div
                className={styles.arrow}
                onClick={() => {
                    emblaApi.scrollPrev()
                }}
            >
                <Arrow />
            </div>
        </div>
    );
}