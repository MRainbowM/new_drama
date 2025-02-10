import { getReviewList } from '../../services/getReviewList';
import { ReviewContent } from '../ReviewContent/ReviewContent';

export async function ReviewSection() {
    // Получение списка отзывов на главной
    const { reviewList } = await getReviewList(
        { is_enable_main: true }
    );

    if (reviewList.length == 0) {
        return (<></>);
    }

    return (
        <>
            <ReviewContent
                title={'Наши зрители'}
                reviewList={reviewList}
            />
        </>
    );
}