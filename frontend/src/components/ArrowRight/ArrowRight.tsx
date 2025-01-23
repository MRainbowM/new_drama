import styles from './ArrowRight.module.scss'
import { EmblaCarouselType } from 'embla-carousel';
import Arrow from 'public/images/arrow.svg'

interface ArrowRightProps {
    emblaApi: EmblaCarouselType
}


export default function ArrowRight(
    { emblaApi }: ArrowRightProps
) {
    return (
        <div className={styles.arrowRight}>
            <div
                className={styles.arrow}
                onClick={() => {
                    emblaApi.scrollNext()
                }}
            >
                <Arrow />
            </div>
        </div>
    );
}