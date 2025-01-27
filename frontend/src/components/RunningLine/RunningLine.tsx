import styles from './RunningLine.module.scss'


export default function RunningLine() {
    return (
        <div className={styles.root}>
            <div className={styles.wrap}>
                <div className={styles.items}>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>                   
                </div>

                <div aria-hidden="true" className={styles.items}>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>
                    <span className={styles.item}>номинант премии «золотая маска»</span>           
                </div>
            </div>
        </div>
    );
}