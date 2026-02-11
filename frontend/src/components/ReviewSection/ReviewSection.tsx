import { getReviewList } from '../../services/api/getReviewList';
import { ReviewContent } from '../ReviewContent/ReviewContent';
import styles from './ReviewSection.module.scss'

export async function ReviewSection() {
    // Получение списка отзывов на главной
    const { reviewList } = await getReviewList(
        { is_enable_main: true }
    );

    if (reviewList.length == 0) {
        return (<></>);
    }

    return (
        <section className={styles.root}>
            <h2>Наши зрители</h2>

            <ReviewContent
                reviewList={reviewList}
            />
        </section>
    );
}