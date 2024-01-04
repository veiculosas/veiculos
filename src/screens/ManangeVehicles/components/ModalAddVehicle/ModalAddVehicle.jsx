import { useRef, useState } from "react";
import styles from './ModalAddVehicle.module.css';

import brasao from '../../../../assets/imgs/brasao.png'

import ReactInputMask from "react-input-mask";
import {GiCarWheel} from 'react-icons/gi';
import {AiOutlineSchedule} from 'react-icons/ai';
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { setDoc, doc } from "firebase/firestore";


export const ModalAddVehicle = ({unidades, db, modalVisible, setModalVisible, getDatabase, setSuccess, setSuccessMessage}) => {

    
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [renavam, setRenavam] = useState('');
    const [atividade, setAtividade] = useState('');
    const [despesa, setDespesa] = useState('');
    const [ufOrigem, setUfOrigem] = useState('sc');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [unidade, setUnidade] = useState(unidades && unidades.assistencia[0]);
    const [imagem, setImagem] = useState('');
    const [seguradora, setSeguradora] = useState('');
    const [vigenciaSeguro, setVigenciaSeguro] = useState('');
    const [pneus, setPneus] = useState([]);
    const [agendamento, setAgendamento] = useState(false);


    const hiddenInputFile = useRef(null);

    const handleOnChangeInputImage = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
            setImagem(data.result);
        });
        data.readAsDataURL(e.target.files[0])
    };  

    const handleCancelModal = () => {
        setModalVisible(!modalVisible);
        setMarca('');
        setModelo('');
        setPlaca('');
        setRenavam('');
        setDespesa('');
        setUfOrigem('sc');
        setAnoFabricacao('');
        setUnidade(unidades && unidades.assistencia[0]);
        setImagem('');
        setSeguradora('');
        setVigenciaSeguro('');
        setPneus('');
        setAgendamento(false);
    };
    const handleAddCar = (event) => {
        event.preventDefault();

        //generate id for vehicle
        const newId = 'veh' + Date.now().toString();
        
        let newVehicle = {
            [newId] : {
                'ativo' : true,
                'marca' : marca,
                'modelo' : modelo,
                'ano' : anoFabricacao,
                'placa' : placa,
                'renavam' : renavam,
                'imagem' : imagem,
                'despesa' : despesa,
                'ufOrigem' : ufOrigem,
                'unidade' : unidade,
                'precisaAgendar' : agendamento
            }
        }


        let newInsurance = {
            [newId] : {
                'seguradora' : seguradora,
                'vigencia' : vigenciaSeguro
            }
        }
        let newActivity = {
            [newId] : atividade
        }

        let newTires = {
            [newId] : {
                ...pneus
            }
        }

        let newImage = {
            [newId] : imagem
        }

        setDoc(doc(db, 'assistencia', 'veiculos'), newVehicle, {merge: true});
        setDoc(doc(db, 'assistencia', 'seguros'), newInsurance, {merge: true});
        setDoc(doc(db, 'assistencia', 'atividades'), newActivity, {merge: true});
        setDoc(doc(db, 'assistencia', 'pneus'), newTires, {merge: true});
        setDoc(doc(db, 'imgs', 'vehicles'), newImage, {merge: true});


        setModalVisible(!modalVisible);
        setMarca('');
        setModelo('');
        setPlaca('');
        setRenavam('');
        setDespesa('');
        setUfOrigem('sc');
        setAnoFabricacao('');
        setUnidade(unidades && Object.keys(unidades)[0]);
        setImagem('');
        setSeguradora('');
        setVigenciaSeguro('');
        setPneus('');
        setAgendamento(false);

        setSuccessMessage("Veículo adicionado com sucesso!");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            getDatabase();
        }, 2000);
        

    };
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{width: '3rem', marginBottom: '.5rem'}} src={brasao} alt="" />

                <span className={styles.modalTitle}>Adicionar Veículo</span>

                <form onSubmit={(e) => handleAddCar(e)} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '1rem'}}> 
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Marca:</span>
                                            <input
                                            value={marca}
                                            onChange={(text) => setMarca(text.target.value)}
                                            placeholder="marca do veículo" 
                                            autoFocus 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Modelo:</span>
                                            <input 
                                            value={modelo}
                                            onChange={(text) => setModelo(text.target.value)}
                                            placeholder="modelo do veículo" 
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                        </div> 
                                </div>
        
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Ano de fabricação/modelo:</span>
                                    <ReactInputMask 
                                    value={anoFabricacao}
                                    onChange={text => setAnoFabricacao(text.target.value)}
                                    mask={"9999/9999"} 
                                    placeholder="ano de fabricação/modelo do veículo" 
                                    className={styles.modalInput} 
                                    type='text'
                                    ></ReactInputMask>
                                </div>

                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Placa:</span>
                                        <input
                                        value={placa}
                                        onChange={(text) => setPlaca(text.target.value)}
                                        maxLength={7} 
                                        placeholder="placa"  
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Renavam:</span>
                                        <input 
                                        value={renavam}
                                        onChange={(text) => setRenavam(text.target.value)}
                                        placeholder="renavam" 
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                </div>

                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Despesa Orçamentária:</span>
                                        <input 
                                        value={despesa}
                                        onChange={text => setDespesa(text.target.value)}
                                        maxLength={3}
                                        placeholder="despesa"
                                        className={styles.modalInputHalf} 
                                        type='text'
                                        ></input>
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>UF de Origem:</span>
                                        <select value={ufOrigem} onChange={(val) => setUfOrigem(val.target.value)} className={styles.modalInputHalf} type='text'>
                                            <option value={'pr'}>PR</option>
                                            <option value={'sc'}>SC</option>
                                            <option value={'rs'}>RS</option>
                                        </select>
                                    </div>    
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Unidade:</span>
                                    <select value={unidade} onChange={(val) => setUnidade(val.target.value)} className={styles.modalInput} type='text'>
                                        {unidades && 
                                            (unidades.assistencia).map((item, index) => {

                                                return(
                                                    <option key={index} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div> 
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                    <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Atividade:</span>
                                    <input 
                                    value={atividade}
                                    onChange={(text) => setAtividade(text.target.value)}
                                    placeholder="atividade" 
                                    className={styles.modalInput} 
                                    type='text'
                                    ></input>
                                </div> 
                            
                             </div>

                             <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Seguradora:</span>
                                            <input 
                                            value={seguradora}
                                            onChange={text => setSeguradora(text.target.value)}
                                            placeholder="seguradora"
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></input>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Vigência Seguro Até:</span>
                                            <ReactInputMask
                                            mask={"99/99/9999"}
                                            value={vigenciaSeguro}
                                            onChange={text => setVigenciaSeguro(text.target.value)}
                                            placeholder="vigência"
                                            className={styles.modalInputHalf} 
                                            type='text'
                                            ></ReactInputMask>
                                    </div>
                                </div>

                                <span style={{marginTop: '1rem'}}>
                                    <GiCarWheel/> Tipo e Estado dos pneus:
                                </span> 
                                    
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                            <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Esquerdo:</span>
                                                <select
                                                defaultValue={'selecionar'}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'de' : val.target.value
                                                    }
                                                )}
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>
                                            </div>
                                            <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Dianteiro Direito:</span>
                                                <select
                                                defaultValue={'selecionar'}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'dd' : val.target.value
                                                    }
                                                )} 
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>
                                            </div>
                                    </div>

                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                        <div className={styles.verticalFlex}>
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Esquerdo:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'te' : val.target.value
                                                }
                                            )}   
                                            className={styles.modalSelectSmall}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                        </div>
                                        <div className={styles.verticalFlex}>  
                                            <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Traseiro Direito:</span>
                                            <select
                                            defaultValue={'selecionar'}
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'td' : val.target.value
                                                }
                                            )} 
                                            className={styles.modalSelectSmall}
                                            >
                                                <option disabled value="selecionar">Selecionar</option>
                                                <option value="Bom">Bom</option>
                                                <option value="Médio">Médio</option>
                                                <option value="Ruim">Ruim</option>
                                            </select>
                                        </div>     
                                    </div> 
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                                        <div className={styles.verticalFlex}>
                                                <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Estepe:</span>
                                                <select
                                                defaultValue={'selecionar'}
                                                onChange={(val) => setPneus(
                                                    {
                                                        ...pneus,
                                                        'estepe' : val.target.value
                                                    }
                                                )} 
                                                className={styles.modalSelectSmall}
                                                >
                                                    <option disabled value="selecionar">Selecionar</option>
                                                    <option value="Bom">Bom</option>
                                                    <option value="Médio">Médio</option>
                                                    <option value="Ruim">Ruim</option>
                                                </select>                                           
                                        </div>
                                        <div className={styles.verticalFlex}>
                                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Tipo: </span>
                                            <ReactInputMask
                                            mask={"999/99 r99"}
                                            placeholder="___/__ r__"
                                            onChange={(val) => setPneus(
                                                {
                                                    ...pneus,
                                                    'tipo' : val.target.value
                                                }
                                            )} 
                                            className={styles.modalSelectSmall} 
                                            type='text'
                                        ></ReactInputMask>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.horizontalFlex} style={{marginTop: '1rem', marginTop: '.5rem'}}>
                                        <AiOutlineSchedule/>
                
                                        <span style={{fontSize: '14px', marginLeft: '1rem', marginRight: '.5rem'}}>Necessita agendamento para uso</span>
                                        <input type="checkbox" value={agendamento} onChange={() => setAgendamento(!agendamento)}/>
                                    </div>

                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '.2rem', alignItems: 'center'}}>
                                        <button type="button" className={styles.addImgButton} onClick={(e) => hiddenInputFile.current.click()}><CiImageOn/>Imagem<FaPlus size={10}/></button>
                                        <input type="file" style={{display: 'none'}} ref={hiddenInputFile} onChange={(e) => handleOnChangeInputImage(e)}/>
                                        {imagem && <CiTrash size={20} className={styles.removeImgButton} onClick={() => window.confirm("Remover a imagem?") && setImagem('')}/>}
                                    </div>
                             </div>                     

                        </div>
                              
                        </div>
                        <div style={{display: 'flex', gap: '.8rem'}}>
                            <button 
                            type='submit' 
                            className={styles.modalBtn} 
                            >Adicionar</button>

                            <button className={styles.modalBtn} onClick={handleCancelModal}>Cancelar</button>
                        </div>                       
                    </form>
                     
                </div>      

    );



}