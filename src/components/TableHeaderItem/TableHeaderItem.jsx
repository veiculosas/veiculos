import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import styles from './TableHeaderItem.module.css';

export const TableHeaderItem = ({title, sortData, sortBy, style}) => {

    const [sortDirection, setSortDirection] = useState('des');
    
    const handleOnClick = () => {

        sortData(sortBy, sortDirection);

        if(sortDirection === 'asc'){
            setSortDirection('des');
        }
        else if (sortDirection === 'des'){
            setSortDirection('asc');
        }

    };

    return (
        <td style={style}>
            <div className={styles.container}>
                <span>{title}</span>
                <span style={{cursor: 'pointer'}} onClick={() => handleOnClick()} className={styles.arrowDownUp}><LuArrowDownUp/></span>
            </div>
        </td>
    );

}