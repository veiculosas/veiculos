import styles from './LargeBtn.module.css';
import {AiFillCar} from 'react-icons/ai';

const LargeBtn = ({title, handleOnClick, icon}) => {
    return(
    <a target='_blank' onClick={() => handleOnClick()} style={{textDecoration: 'none'}}>
        <button className={styles.btnContainer}>
            {icon}
            {title}
        </button>
    </a>
    );
}
export default LargeBtn;