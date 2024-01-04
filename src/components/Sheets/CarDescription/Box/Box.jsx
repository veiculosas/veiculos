import styles from './Box.module.css';

const Box = ({title, content}) => {

    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                {title}
            </div>
            <div className={styles.boxContent}>
                {content}
            </div> 
        </div>
    );

}
export default Box;