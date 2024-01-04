import { useContext, useEffect, useState } from "react";
import styles from './ChangePassModal.module.css';

import brasao from '../../../../assets/imgs/brasao.png'
import { AiOutlineSave } from "react-icons/ai";
import { TiCancelOutline } from "react-icons/ti";
import { UserContext } from "../../../../context/UserContext";



export const ChangePassModal = ({
        modalVisible,
        setModalVisible
    }) => {

    const {changePassword, logout} = useContext(UserContext);

    const [newPass, setNewPass] = useState('');
    const [newPassRpt, setNewPassRpt] = useState('');
    const [messageNewPass, setMessageNewPass] = useState('');
    const [messageNewPassRpt, setMessageNewPassRpt] = useState('');


    const handleCancelModal = () => {
        setModalVisible(false);
        setNewPass('');
        setNewPassRpt('');
        setMessageNewPass('');
        setMessageNewPassRpt('');
    };

    const handleOnChangeNewPass = (e) => {
        setNewPass(e.target.value);
        if(e.target.value.length > 0 && e.target.value.length <= 7){
            setMessageNewPass("A senha deve conter no mínimo 8 caracteres");
        }
        else{
            setMessageNewPass('');
        }
    };
    const handleOnChangeNewPassRpt = (e) => {
        setNewPassRpt(e.target.value);
        if(newPass != '' && e.target.value != newPass){
            setMessageNewPassRpt("As duas senhas devem ser iguais");
        }
        else if(e.target.value == newPass){
            setMessageNewPassRpt("");
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(newPass != newPassRpt){
            alert("As senhas não conferem");
        }
        else if(newPass == '' || newPassRpt == ''){
            alert("Preencha todos os campos");
        }
        else if(newPass.length <= 7){
            alert("Preencha todos os requisitos");
        }
        else if (newPass === newPassRpt && newPass != '' && newPassRpt != ''){
            handleChangePassword();
        }
    }

    const handleChangePassword = async() => {
        try {
            await changePassword(newPass);
            alert("Senha alterada com sucesso");
            setModalVisible(false);
            await logout();
        }
        catch (err){
            alert(err.message);
        }
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '5rem', paddingBottom: '5rem'}}>
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />
                <span className={styles.modalTitle}>Alterar Senha</span>

                <form onSubmit={(e) => handleOnSubmit(e)} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '1rem'}}> 
                                               
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Nova senha:</span>
                             <input
                               value={newPass}
                                onChange={(text) => handleOnChangeNewPass(text)}
                                placeholder="nova senha" 
                                autoFocus 
                                className={styles.modalInput} 
                                type='password'
                                >
                            </input>
                            <span style={{fontSize: '12px', marginTop: '.4rem', fontStyle: 'italic'}}>{messageNewPass}</span>
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Repita a nova senha:</span>
                             <input
                               value={newPassRpt}
                                onChange={(text) => handleOnChangeNewPassRpt(text)}
                                placeholder="repita a nova senha" 
                                className={styles.modalInput} 
                                type='password'
                                >
                            </input>
                            <span style={{fontSize: '12px', marginTop: '.4rem', fontStyle: 'italic'}}>{messageNewPassRpt}</span>

                        </div>


                        <div style={{display: 'flex', gap: '.8rem', marginTop: '.5rem'}}>
                            <button 
                            type='submit' 
                            className={styles.modalBtn}
                            ><AiOutlineSave/>Alterar Senha</button>

                            <button className={styles.modalBtn} onClick={handleCancelModal}><TiCancelOutline size={15}/>Cancelar</button>
                            
                        </div>          
                                
                    </form>
                     
                </div>      

    );



}