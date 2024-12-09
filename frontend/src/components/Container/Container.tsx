import styles from './Container.module.scss'

interface ContainerProps {
    children?: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className={styles.container} id="container">
            {children}
        </div>
    )
}