import styles from './MaintenancesHistory.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import {LuHistory} from 'react-icons/lu';
import {HiMiniArrowTopRightOnSquare} from 'react-icons/hi2'

const MaintenancesHistory = ({curVehicle, history}) => {

    const formatDate = (data) => {
        //return date on DD/MM/YYYY format
        const curDate = new Date(data);
        const month = String(curDate.getUTCMonth() + 1);
        const day = String(curDate.getUTCDate());
        const year = curDate.getUTCFullYear();

        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
    };


    if(history == undefined){
        return
    };

    return(
        <div className={styles.boxContainer}>

        <div className={styles.boxHeader}><LuHistory/>Histórico de Manutenções</div>

            <div className={styles.historyContainer}>
            {
            history[curVehicle] ?    
            Object.keys(history[curVehicle]).map((item, index) => {
                
                return(
                    <details key={index}>
                        <summary className={styles.itemContainer}>
                            <div>{history[curVehicle][item].desc}</div>
                            <div><IoIosArrowDown size={12} className={styles.arrowDown}/></div>
                        </summary>
                        <div className={styles.accordionDesc}>

                            <div>Oficina: {history[curVehicle][item].shop ? history[curVehicle][item].shop : 'Não especificado'}</div>

                            <div>Data: {history[curVehicle][item].date ? formatDate(history[curVehicle][item].date) : 'Não especificada'}</div>

                            <div className={styles.openNfeBtn}><HiMiniArrowTopRightOnSquare/></div>
                            
                        </div>            
                    </details>
                );
            })
            :
            <div className={styles.doNotHavePrevRegisters}>Sem registro de manutenções anteriores.</div>
            }
            </div>         
        </div>
    );
}
export default MaintenancesHistory;