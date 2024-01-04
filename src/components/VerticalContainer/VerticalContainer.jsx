import React from "react";
import styles from './VerticalContainer.module.css';

import ListBox from "../ListBox/ListBox";
import CarImage from "../CarImage/CarImage";
import MechanicalPendences from "../Sheets/MechanicalPendences/MechanicalPendences";

const VerticalContainer = (props) => {

    return(
        <div className={styles.container}>
            {props.children}
        </div>
    );

}

export default VerticalContainer;