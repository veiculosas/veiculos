import { useContext, useEffect, useState } from "react";
import styles from './Drivers.module.css';

import Container from "../../components/Container/Container";
import Modal from 'react-modal';
import brasao from '../../assets/imgs/brasao.png'

import {BsFillPencilFill, BsPencilFill} from 'react-icons/bs';

import {AiFillPlusCircle} from 'react-icons/ai';



import { ApiContext } from "../../context/ApiContext";
import { ModalAddDriver } from "./components/ModalAddDriver/ModalAddDriver";
import { doc, getDoc } from "firebase/firestore";
import { ModalEditDriver } from "./components/ModalEditDriver/ModalEditDriver";
import {GrCheckmark} from 'react-icons/gr';
import { TableHeaderItem } from "../../components/TableHeaderItem/TableHeaderItem";


const Drivers = () => {
        
    const {db, drivers, getDrivers} = useContext(ApiContext);

    const [sortedDrivers, setSortedDrivers] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('add');

    //sucess message on save changes
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');

    const [driverToEditId, setDriverToEditId] = useState();

    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(
                <ModalAddDriver
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                db={db}
                getDatabase={() => getDrivers()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
                />
            );
        }
        else if(modalContent == 'edit'){
            return(
                <ModalEditDriver
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                driverId={driverToEditId}
                db={db}
                drivers={drivers}
                getDatabase={() => getDrivers()}
                setSuccessMessage={setSuccesMessage}
                setSuccess={setSuccess}
                />
            );
        }
       
    }

    const handleAddVehicle = () => {
        setModalContent('add');
        setModalVisible(!modalVisible);
    }

    const handleEditVehicle = (id) => {
        setModalContent("edit");
        setModalVisible(!modalVisible);
        setDriverToEditId(id);
    }

    const sortData = (sortBy, order) => {

        let sorted;

        if(sortBy == 'validade') {
            
            sorted = Object.keys(drivers).sort((a, b) => {

                let [dayA, monthA, yearA] = (drivers[a].validade).split('/');
                let [dayB, monthB, yearB] = (drivers[b].validade).split('/');

                const dateA = new Date(+yearA, +monthA - 1, +dayA);
                const dateB = new Date(+yearB, +monthB - 1, +dayB);

                if(order == 'asc'){
                    return dateA < dateB ? -1 : 1;
                }
                else if(order == 'des'){
                    return dateA < dateB ? 1 : -1;
                };

            });
      
        }
        else if(sortBy == 'status'){
            sorted = Object.keys(drivers).sort((a, b) => {
                if(order == 'asc'){
                    return (drivers[a].ativo) == true && (drivers[b].ativo) == false ? -1 : 1;
                }
                else if(order == 'des'){
                    return (drivers[a].ativo) == true && (drivers[b].ativo) == false ? 1 : -1;
                }
             });
        }
        else{
            sorted = Object.keys(drivers).sort((a, b) => {
                if(order == 'asc'){
                    return (drivers[a][sortBy]).toLowerCase() < (drivers[b][sortBy]).toLowerCase() ? -1 : 1;
                }
                else if(order == 'des'){
                    return (drivers[a][sortBy]).toLowerCase() < (drivers[b][sortBy]).toLowerCase() ? 1 : -1;
                }
             });
        }
        
         setSortedDrivers(sorted);
         
    };

    useEffect(() => {
        sortData('nome', 'asc');
    }, []);


    return(
        <div className={styles.VerticalContainer}>           

            {/*Displays sucess message if succes is true*/}
            {success && <div className={styles.successMessage}>
            <GrCheckmark 
            style={{
                filter: 'invert(51%) sepia(97%) saturate(414%) hue-rotate(71deg) brightness(103%) contrast(92%)'
            }}
            />
            {successMessage}
            </div>}

            <Container>           

            <AiFillPlusCircle onClick={() => handleAddVehicle()} className={styles.addBtn}/>
          
           <table>
                <tr className={styles.tableHeader}>
                    <TableHeaderItem title={"Nome do Condutor"} sortBy={'nome'} sortData={sortData}/>
                    <TableHeaderItem title={"CNH"} sortBy={"cnh"} style={{width: '10rem'}} sortData={sortData}/>
                    <TableHeaderItem style={{width: '5rem'}} title={'Categoria'} sortBy={'categoria'} sortData={sortData}/>
                    <TableHeaderItem title={'Validade'} sortBy={'validade'} sortData={sortData} style={{width: '5rem'}}/>
                    <TableHeaderItem title={'Situação'} sortBy={'validade'} sortData={sortData} style={{width: '10rem'}}/>          
                    <TableHeaderItem title={'Status'} sortBy={'status'} sortData={sortData} style={{width: '5rem'}}/>  
                    <td></td>
                </tr>
                {drivers && 
                sortedDrivers.map((item, index) => {
                    
                    //convert date string to javascript Date
                    let [day, month, year] = drivers[item].validade && (drivers[item].validade).split("/");
                    let dataVenc = new Date(year, month - 1, day);

                    return(
                        <tr>
                            <td
                            style={{textTransform: 'uppercase'}}
                            >{drivers[item].nome ? drivers[item].nome : ''}</td>

                            <td 
                            style={{textTransform: 'capitalize'}}
                            >
                             {drivers[item].cnh && drivers[item].cnh}   
                            </td>
                            
                            <td
                            style={{textTransform: 'uppercase', textAlign: 'center'}}
                            >{drivers[item].categoria ? drivers[item].categoria : ''}</td>
                            
                            <td style={dataVenc.getTime() <= Date.now() ? {backgroundColor: 'rgba(250, 5, 5, 1)'} : {backgroundColor: 'transparent'}}
                            >
                            {drivers[item].validade ? drivers[item].validade : ''}
                            </td>
        
                            <td>{dataVenc.getTime() <= Date.now() ? 'CNH Vencida' : 'CNH Vigente'}</td>

                            
                            <td style={{textAlign: 'center'}}>
                            {drivers[item].ativo && drivers[item].ativo == true ? 'Ativo' : 'Inativo'}
                            </td>

                            <td style={{width: '1.5rem'}}>
                                <BsFillPencilFill
                                onClick={() => handleEditVehicle(item)}
                                className={styles.editBtn}
                            />
                            </td> 
                        </tr>
                    );
                })}
           </table>

           <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)', zIndex: '10'}}}
            >   
            {handleModalContent()}
            </Modal> 
            </Container>
        </div>
    );  

}

export default Drivers;