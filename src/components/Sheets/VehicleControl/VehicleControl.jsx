import LargeBtn from '../../Buttons/LargeBtn/LargeBtn';
import styles from './VehicleControl.module.css';
import {FaRegFilePdf} from 'react-icons/fa6';
import {BsPrinter} from 'react-icons/bs';
import {GenerateVehicleControl} from '../../../screens/Reports/Scripts/VehicleControl';

const VehicleControl = ({curVehicle, vehicles}) => {

    const handleOnClick = () => {
        GenerateVehicleControl(curVehicle, vehicles);
    }
    
    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}><FaRegFilePdf/>Controle de Veículo</div>
            <div className={styles.itemContainer}>

                <button onClick={() => handleOnClick()} className={styles.btnContainer}>
                    <BsPrinter/>
                    Imprimir Controle de Veículo
                </button>

            </div>
                           

        </div>
           
    );
}
export default VehicleControl;