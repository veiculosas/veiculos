import { useContext, useEffect, useState } from 'react';
import styles from './CarImage.module.css';
import { ApiContext } from '../../context/ApiContext';


const CarImage = ({vehicles, curVehicle}) => {

    const {images} = useContext(ApiContext);

    if(images == null){
        return
    }
    else if (images[curVehicle]){
        return(
        <div className={styles.divContainer}>
            <img
                className={styles.imageContainer} 
                src={images[curVehicle]}
                alt='Imagem Carro'
            />
        </div>
        );
    }
    

}
export default CarImage;