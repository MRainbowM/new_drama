import { components } from '../../api/schema'
import ReviewList from '../ReviewList/ReviewList';
import ReviewText from '../ReviewText/ReviewText';
import styles from './ReviewContent.module.scss'

interface ReviewContentProps {
    title: string,
    reviewList: components['schemas']['ReviewOutSchema'][]
}

export async function ReviewContent(
    { title, reviewList }: ReviewContentProps
) {
    return (
        <section className={styles.root}>
            <h2>{title}</h2>

            <div className={styles.content}>
                <ReviewText />
                <ReviewList
                    reviewList={reviewList}
                />
            </div>
        </section>

    );
}