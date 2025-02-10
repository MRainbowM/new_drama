import { getReviewList } from '../../services/getReviewList';
import { ReviewContent } from '../ReviewContent/ReviewContent';
import styles from './EventDetailReview.module.scss';

interface EventDetailReviewParams {
    /* id спектакля - получение отзывов только для одного спектакля */
    event_id: number
}


export async function EventDetailReview(
    { event_id }: EventDetailReviewParams
) {
    // Получение списка отзывов на главной
    const { reviewList } = await getReviewList(
        {
            is_enable_event: true,
            event_id: event_id
        }
    );

    if (reviewList.length == 0) {
        return (<></>);
    }

    return (
         <section className={styles.root}>
            <h2>Отзывы на спектакль</h2>

            <ReviewContent
                reviewList={reviewList}
            />
        </section>
    );
}