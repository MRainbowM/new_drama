import styles from './ReviewItem.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'

interface ReviewItemProps {
    review: components['schemas']['ReviewOutSchema']
}


export default function ReviewItem(
    { review }: ReviewItemProps
) {
    return (
        <div className={styles.root}>
            <Image
                src={review.image}
                width={500}
                height={500}
                alt={review.nickname}
            />
        </div>
    );
}