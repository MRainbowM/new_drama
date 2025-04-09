import { ChangeEventHandler } from 'react';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
    onChange: ChangeEventHandler,
    toggleValue: boolean
}


export default function ToggleButton(
    { onChange, toggleValue }: ToggleButtonProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.btn}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={toggleValue}
                    onChange={onChange}
                />
                <div className={styles.knob}></div>
                <div className={styles.btnBg}></div>
            </div>
        </div>

    );
}