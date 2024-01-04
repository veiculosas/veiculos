import React from "react";
import styles from './Container.module.css';

import ListBox from "../ListBox/ListBox";
import CarImage from "../CarImage/CarImage";
import MechanicalPendences from "../Sheets/MechanicalPendences/MechanicalPendences";
import VerticalContainer from "../VerticalContainer/VerticalContainer";
import CarDescription from '../Sheets/CarDescription/CarDescription';
import Tires from "../Sheets/Tires/Tires";
import MaintenancesHistory from "../Sheets/MaintenancesHistory/MaintenancesHistory";
import LargeBtn from "../Buttons/LargeBtn/LargeBtn";
import VehicleControl from "../Sheets/VehicleControl/VehicleControl";

const Container = (props) => {

    return(
        <div className={styles.container}>
            {props.children}
        </div>
    );  

}

export default Container;