import { useEffect, useState } from "react";
import styles from './ModalEditDriver.module.css';

import brasao from '../../../../assets/imgs/brasao.png'

import ReactInputMask from "react-input-mask";
import {GiCarWheel} from 'react-icons/gi';
import {AiOutlineSchedule} from 'react-icons/ai';
import {AiOutlineSave} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';
import { TiCancelOutline } from 'react-icons/ti';
import { setDoc, doc, getDoc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";


export const ModalEditDriver = ({
        db, 
        modalVisible, 
        setModalVisible, 
        drivers,
        driverId,
        getDatabase,
        setSuccess,
        setSuccessMessage
    }) => {

    const [ativo, setAtivo] = useState(false);
    const [nome, setNome] = useState('');
    const [cnh, setCnh] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [categoria, setCategoria] = useState('');
    const [validade, setValidade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [contato, setContato] = useState('');

    //set values to inputs
    const setData = () => {

        if(drivers[driverId])
        {
          setAtivo(drivers[driverId].ativo);
          setNome(drivers[driverId].nome && drivers[driverId].nome);
          setCnh(drivers[driverId].cnh && drivers[driverId].cnh);
          setRg(drivers[driverId].rg && drivers[driverId].rg);
          setCpf(drivers[driverId].cpf && drivers[driverId].cpf);
          setCategoria(drivers[driverId].categoria && drivers[driverId].categoria);
          setValidade(drivers[driverId].validade && drivers[driverId].validade);
          setDataNascimento(drivers[driverId].dataNascimento && drivers[driverId].dataNascimento);
          setContato(drivers[driverId].contato && drivers[driverId].contato);
        }

        
    }

    useEffect(() => {
        setData();
    }, []);

    const handleCancelModal = () => {
        setModalVisible(!modalVisible);
        setAtivo(false);
        setNome('');
        setCnh('');
        setCategoria('');
        setValidade('');
        setDataNascimento('');
        setContato('');
    };

    const handleEditDriver = (event) => {
        event.preventDefault();

        if(window.confirm('Salvar alterações?') == false){
            return
        }

        let newDriver = {
            [driverId] : {
                'ativo' : ativo,
                'categoria' : categoria,
                'cnh' : cnh,
                'cpf' : cpf,
                'nome' : nome,
                'rg' : rg,
                'validade' : validade,
                'dataNascimento': dataNascimento,
                'contato' : contato
            }
        };

        setDoc(doc(db, 'assistencia', 'condutores'), newDriver, {merge: true});

        setModalVisible(!modalVisible);
        setSuccessMessage("Alterações realizadas com sucesso!");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            getDatabase();
        }, 2000);
        
    };

    const handleRemoveDriver = () => {

        if(window.confirm('Excluir condutor?') == false){
            return
        }
        
        updateDoc(doc(db, 'assistencia', 'condutores'), {
            [driverId] : deleteField()
        });

        setModalVisible(!modalVisible);
        setSuccessMessage("Condutor removido com sucesso!");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            getDatabase();
        }, 2000);

    };

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '5rem', paddingBottom: '5rem'}}>
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />
                <span className={styles.modalTitle}>Editar Condutor</span>

                <form onSubmit={(e) => handleEditDriver(e)} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '1rem'}}> 
                    
                    
                    <div className={styles.verticalFlex}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Status:</span>
                        <select
                        defaultValue={ativo}
                        value={ativo}
                        onChange={(val) => setAtivo(val.target.value == 'true' ? true : false)}
                        className={styles.modalSelectSmall}
                        >
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>
                    </div>

                    
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                                    
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Nome do Condutor:</span>
                             <input
                               value={nome}
                                onChange={(text) => setNome(text.target.value)}
                                placeholder="nome do condutor" 
                                autoFocus 
                                className={styles.modalInput} 
                                type='text'
                                ></input>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>RG:</span>
                                            <input 
                                            value={rg}
                                            onChange={(text) => setRg(text.target.value)}
                                            placeholder="rg" 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 

        
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>CPF:</span>
                                            <ReactInputMask 
                                            value={cpf}
                                            onChange={text => setCpf(text.target.value)}
                                            mask={"999.999.999-99"} 
                                            placeholder="CPF" 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></ReactInputMask>
                                        </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>CNH:</span>
                                            <input 
                                            value={cnh}
                                            onChange={(text) => setCnh(text.target.value)}
                                            placeholder="número da CNH" 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 

        
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Categoria:</span>
                                            <input 
                                                value={categoria}
                                                onChange={(text) => setCategoria(text.target.value.replace(/[^a-e]/gi, ''))}
                                                placeholder="categoria da CNH" 
                                                className={styles.modalInputHalf} 
                                                type='text'
                                                maxLength={2}
                                            ></input>
                                        </div>
                        </div>

                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Validade CNH:</span>
                                        <ReactInputMask 
                                        value={validade}
                                        onChange={text => setValidade(text.target.value)}
                                        mask={"99/99/9999"} 
                                        placeholder="validade CNH" 
                                        className={styles.modalInput} 
                                        type='text'
                                        ></ReactInputMask>
                                    </div> 

                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Data de Nascimento:</span>
                                    <ReactInputMask 
                                    value={dataNascimento}
                                    onChange={text => setDataNascimento(text.target.value)}
                                    mask={"99/99/9999"} 
                                    placeholder="data de nascimento" 
                                    className={styles.modalInputHalf} 
                                    type='text'
                                    ></ReactInputMask>
                                </div> 


                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Telefone:</span>
                                    <ReactInputMask 
                                    value={contato}
                                    onChange={text => setContato(text.target.value)}
                                    mask={"(99)99999-9999"} 
                                    placeholder="()_____-____" 
                                    className={styles.modalInputHalf} 
                                    type='text'
                                    ></ReactInputMask>
                                </div>
                        </div> 

                        <div style={{display: 'flex', gap: '.8rem', marginTop: '.5rem'}}>
                            <button 
                            type='submit' 
                            className={styles.modalBtn} 
                            ><AiOutlineSave/>Salvar</button>

                            <button className={styles.modalBtn} onClick={handleCancelModal}><TiCancelOutline size={15}/>Cancelar</button>
                            
                        </div> 

                        <button type="button" className={styles.modalBtn}
                        onClick={handleRemoveDriver}><ImCancelCircle/>
                        Remover Condutor
                        </button>             
                                
                    </form>
                     
                </div>      

    );



}