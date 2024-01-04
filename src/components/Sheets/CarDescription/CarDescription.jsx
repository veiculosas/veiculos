import { useState, useEffect } from 'react';
import Box from './Box/Box.jsx';
import DoubleBox from './DoubleBox/DoubleBox.jsx';
import styles from './CarDescritpion.module.css'
import { useContext } from 'react';
import { ApiContext } from '../../../context/ApiContext.jsx';

import { getDoc, doc } from 'firebase/firestore';


const CarDescritpion = ({curVehicle}) => {

    const {vehicles, activities, insurances} = useContext(ApiContext);


    if(vehicles == undefined || activities == undefined || insurances == undefined){
        return
    }
    
    return(
        
        <>
            {
            vehicles[curVehicle] &&
            <div className={styles.descContainer}>

                {activities[curVehicle] &&
                <Box 
                title='Atividade:' 
                content={(activities[curVehicle]).toUpperCase()}
                />
                }

                {vehicles[curVehicle].modelo &&
                <Box 
                title='Modelo:' 
                content={(vehicles[curVehicle].marca + ' ' + vehicles[curVehicle].modelo  + ' ' + vehicles[curVehicle].ano).toUpperCase()}
                />
                }
                
                {vehicles[curVehicle].placa &&
                <Box 
                title='Placa:' 
                content={(vehicles[curVehicle].placa).toUpperCase()}
                />
                }

                {vehicles[curVehicle].renavam &&
                <Box 
                title='Renavam:' 
                content={vehicles[curVehicle].renavam}
                />
                }
                {insurances[curVehicle] &&
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    {insurances[curVehicle].seguradora &&
                      <DoubleBox 
                        border_right={true} 
                        title='Seguradora:'
                        content={insurances[curVehicle].seguradora ? (insurances[curVehicle].seguradora).toUpperCase() : ''} 
                    />  
                    }
                    
                    {insurances[curVehicle].vigencia &&
                    <DoubleBox 
                    title='Vigência até:'
                    content={insurances[curVehicle].vigencia ? insurances[curVehicle].vigencia : ''} 
                    />
                    }
                </div>
                }
            </div>
            
        }
        
        </>   
        
    );
    
}
export default CarDescritpion;