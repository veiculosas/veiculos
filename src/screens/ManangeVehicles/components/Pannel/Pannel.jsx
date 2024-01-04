import styles from './Pannel.module.css';

export const Pannel = ({title, content}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>
               {title}
            </div>
            <div className={styles.content}>
                {content}
            </div>
            
        </div>
    );


}