import styles from './MechanicalPendences.module.css';
import {CiCircleRemove} from 'react-icons/ci';
import {HiCheck} from 'react-icons/hi';
import {BsTools} from 'react-icons/bs';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import brasao from '../../../assets/imgs/brasao.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ApiContext } from '../../../context/ApiContext';


const MechanicalPendences = ({curVehicle, db}) => {


    const {mechanicalPendences, maintenanceHistory, getMechanicalPendences, getMaintenanceHistory} = useContext(ApiContext);

    const pendencesRef = doc(db, 'assistencia', 'pendenciasMec');
    const mecHistoryRef = doc(db, 'assistencia', 'historicoMec');

    let date = new Date();
    let curYear = String(date.getFullYear());
    let curMonth = String(date.getMonth()+1);
    let curDay = String(date.getDate());

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pendenceValue, setPendenceValue] = useState('');

    //Confirm pendence states declaration
    const [curConfirmPendence, setCurConfirmPendence] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceShop, setServiceShop] = useState('');
    const [serviceDate, setServiceDate] = useState(`${curYear}-${curMonth.padStart(2, "0")}-${curDay.padStart(2, "0")}`);

    //prevent scroll when modal is open
    useEffect(() => {
        if (modalVisible) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [modalVisible]);

    //Set content that will show on modal
    const handleModalContent = () => {
        if(modalContent === 'add'){
            return(


                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />

                <span className={styles.modalTitle}>Cadastrar Pendência</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Descrição:</span>
                        <input autoFocus onChange={(val) => setPendenceValue(val.target.value)} className={styles.modalInput} type='text'></input>
                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>

                        <button 
                        onSubmit={(e) => {e.preventDefault(); handleAddPendence()}} 
                        type='submit' 
                        className={styles.modalBtn} 
                        onClick={handleAddPendence}>
                            Adicionar
                        </button>

                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    
                    </form>      
            );
        }
        else if (modalContent === 'confirmPendence'){
            return(
                <form onSubmit={(e) => {e.preventDefault(); handleConfirmPendence()}} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 

                <span className={styles.modalTitle}>Marcar como concluído</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Descrição do serviço realizado:</span>
                        <input value={serviceDescription} autoFocus onChange={(val) => setServiceDescription(val.target.value)} className={styles.modalInput} type='text'></input>
                        
                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Oficina:</span>
                        <input onChange={(val) => setServiceShop(val.target.value)} className={styles.modalInput} type='text'></input>

                        <span style={{fontSize: '12px', marginBottom: '.3rem', marginTop: '.5rem'}}>Data do serviço:</span>
                        <input value={serviceDate} onChange={(val) => setServiceDate(val.target.value)} className={styles.modalInput} type='date'></input>

                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>
                        <button
                        className={styles.modalBtn}
                        type='submit'
                        >
                        Confirmar
                        </button>
                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    
                    </form>      
            );
        }
    }
    
    //On click to confirm pendence
    const handleOnClickConfirm = (item) => {
        setCurConfirmPendence(item);
        setServiceDescription(item);
        setModalContent('confirmPendence');
        setModalVisible(!modalVisible);
    }
    //On confirm pendence
    const handleConfirmPendence = () => {

        //On confirm a pendence, it becomes a history item

        //filter pendences list to remove the current pendence
        let filteredArray = mechanicalPendences[curVehicle].filter((pendenceItem) => {
            if(pendenceItem != curConfirmPendence){
                return pendenceItem
            }
        });
        
        //generate id to service
        const serviceId = () => {
            return Date.now().toString();
        };

        //set new history item structure
        let newHistoryItem = {
            ['serv' + serviceId()]: {
                'desc' : serviceDescription,
                'date' : serviceDate,
                'shop' : serviceShop
            }
        };




        //concat new history item to previous history
        let newHistory = maintenanceHistory[curVehicle] ? {
            [curVehicle] : {
                ...maintenanceHistory[curVehicle],
                ...newHistoryItem
            }
        } : {
            [curVehicle] : {
                ...newHistoryItem
            }
        };

        let newMechanicalPendences = {
            [curVehicle] : [
                ...filteredArray
            ]
        };

        setDoc(mecHistoryRef, newHistory);
        setDoc(pendencesRef, newMechanicalPendences);

        
        getMechanicalPendences();
        getMaintenanceHistory();

        setServiceDate(`${curYear}-${curMonth.padStart(2, "0")}-${curDay.padStart(2, "0")}`);
        setServiceDescription('');
        setServiceShop('');
        setModalVisible(!modalVisible);

    };

    //On click add button
    const handleOnClickAdd = () => {
            setModalContent('add');
            setModalVisible(!modalVisible);
    }
    //On add new pendence
    const handleAddPendence = () =>{


        let newArray = mechanicalPendences[curVehicle] ? { 
            [curVehicle] : [
                ...mechanicalPendences[curVehicle],
                pendenceValue
            ]
        } : { 
            [curVehicle] : [
                pendenceValue
            ]
        };

        setDoc(pendencesRef, newArray);
        getMechanicalPendences();
        setModalVisible(!modalVisible);

    }

    //On click remove pendence
    const handleRemovePendence = (item) => {

        let filteredArray = mechanicalPendences[curVehicle].filter((pendenceItem) => {
            if(pendenceItem != item){
                return pendenceItem
            }
        });

        let newArray = {
            [curVehicle] : [
                ...filteredArray
            ]
        };

        setDoc(pendencesRef, newArray, {merge: true});
        getMechanicalPendences();

    }

    //If have no pendences, then return a blank component. Else, return the correct component 
    
        return(
            <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                <BsTools/>
                Manutenções Pendentes
                <AiFillPlusCircle onClick={handleOnClickAdd} className={styles.addButton}/>
            </div>
                {mechanicalPendences[curVehicle] ?
                <>
                {
                (mechanicalPendences[curVehicle]).length > 0 ?
                mechanicalPendences[curVehicle].map((item, index) => {

                    return(
                        <div key={index} className={styles.itemContainer}>
                            <div className={styles.boxItem}>{item}</div>
                            <div style={{display: 'flex', gap: '1rem'}}>
                                <HiCheck onClick={() => handleOnClickConfirm(item)} className={styles.checkBtn}/>
                                <CiCircleRemove className={styles.rmvBtn} onClick={() => handleRemovePendence(item)}/>
                            </div>
                        </div>
                    );
                })
                :
                <div className={styles.doNotHaveMaintanences}>Não há manutenções pendentes.</div>                
                }
            </>  
            :  
            <div className={styles.doNotHaveMaintanences}>Não há manutenções pendentes.</div> 
            }   
            <Modal
            isOpen={modalVisible}
            className={styles.modal}
            style={{overlay: {backgroundColor: 'rgba(214, 214, 214, 0.5)'}}}
            >   
            {handleModalContent()}
            </Modal>    
    
            </div>
        );
    
    
    
}
export default MechanicalPendences;