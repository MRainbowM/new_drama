import styles from './WidgetSection.module.scss';
import DgisWidget from '../DgisWidget/DgisWidget';
import YandexMap from '../YandexMap/YandexMap';

export default function WidgetSection() {
    return (
        <section className={styles.root}>
            <h2>Как нас найти</h2>

            <div className={styles.widgets}>
                <YandexMap />
                <DgisWidget />
            </div>
        </section>
    );
}
