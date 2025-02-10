import styles from './ReviewSection.module.scss'
import { apiClient } from '../../api/client'
import ReviewText from '../ReviewText/ReviewText';
import ReviewList from '../ReviewList/ReviewList';

export async function ReviewSection() {
    // Получение списка фотографий зрителей
    const response = await apiClient.GET('/info/review/list', {
        params: {
            query: {
                is_enable_main: true
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        throw new Error('error'); //TODO
        return (<></>);
    }

    if (response.data.length == 0) {
        return (<></>);
    }

    return (
        <section className={styles.root}>
            <h2>Наши зрители</h2>

            <div className={styles.content}>
                <ReviewText />
                <ReviewList
                    reviewList={response.data}
                />
            </div>

        </section>
    );
}