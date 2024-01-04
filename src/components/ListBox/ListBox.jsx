import styles from './ListBox.module.css';
import { ApiContext } from '../../context/ApiContext';
import { useContext, useEffect, useState } from 'react';


const ListBox = () => {

    const {curVehicle, setCurVehicle, vehicles} = useContext(ApiContext);
    
    const [sortedVehicles, setSortedVehicles] = useState();

    const sortData = () => {
        const ordened = Object.keys(vehicles).sort((a, b) => {
            return (vehicles[a].modelo).toLowerCase() < (vehicles[b].modelo).toLowerCase() ? -1 : 1;            
        });
        setSortedVehicles(ordened);
    };
 
    useEffect(() => {
        sortData();
    }, [vehicles]);

    const handleOnChange = (val) => {
        setCurVehicle(val.target.value);
    };

    return(
        <select value={curVehicle} onChange={value => handleOnChange(value)} className={styles.selectBox}>
            
            {sortedVehicles &&
                sortedVehicles.map((veiculo, index) => {                    
                    let vehDisplay = vehicles[veiculo].modelo + ' - ' + (vehicles[veiculo].placa).toUpperCase(); 
                    return(
                        <option value={veiculo} key={index}>     
                            {vehDisplay}
                        </option>
                    );
                })
            }   
            
        </select>    
        );

}
export default ListBox;