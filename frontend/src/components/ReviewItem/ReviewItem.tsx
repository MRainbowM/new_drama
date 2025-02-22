import styles from './ReviewItem.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'

interface ReviewItemProps {
    review: components['schemas']['ReviewOutSchema'],
    onClickImg: Function,
    index: number
}


export default function ReviewItem(
    { review, onClickImg, index }: ReviewItemProps
) {
    return (
        <div
            className={styles.root}
            onClick={() => onClickImg(index)}
        >
            <Image
                src={review.image}
                width={500}
                height={500}
                alt={review.nickname}
            />
        </div>
    );
}