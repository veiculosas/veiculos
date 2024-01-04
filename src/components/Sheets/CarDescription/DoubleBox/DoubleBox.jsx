import styles from './DoubleBox.module.css';

const DoubleBox = ({title, content, border_right}) => {

    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                {title}
            </div>
            <div 
            style={
                border_right ? {borderRight: '1px solid black'} : {borderRight: 'none'}
            }
            className={styles.boxContent}>
                {content}
            </div> 
        </div>
    );

}
export default DoubleBox;