import { components } from '../../api/schema'
import ReviewList from '../ReviewList/ReviewList';
import ReviewText from '../ReviewText/ReviewText';
import styles from './ReviewContent.module.scss'

interface ReviewContentProps {
    reviewList: components['schemas']['ReviewOutSchema'][]
}

export async function ReviewContent(
    { reviewList }: ReviewContentProps
) {
    return (
        <div className={styles.content}>
            <ReviewText />
            <ReviewList
                reviewList={reviewList}
            />
        </div>
    );
}