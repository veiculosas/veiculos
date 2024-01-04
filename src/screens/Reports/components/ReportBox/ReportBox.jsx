import styles from './ReportBox.module.css';

export const ReportBox = ({icon, title, handleOnClick}) => {

    return(
    <div onClick={handleOnClick} className={styles.container}>
        <div className={styles.icon}>
           {icon} 
        </div>
        <div className={styles.title}>
           {title}
        </div>
    

    </div>
    );

}