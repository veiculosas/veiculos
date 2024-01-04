import { useContext, useEffect, useState } from "react";
import styles from './Dashboard.module.css';

import Container from "../../components/Container/Container";
import ListBox from "../../components/ListBox/ListBox";
import CarImage from "../../components/CarImage/CarImage";
import MechanicalPendences from "../../components/Sheets/MechanicalPendences/MechanicalPendences";
import VerticalContainer from "../../components/VerticalContainer/VerticalContainer";
import CarDescription from '../../components/Sheets/CarDescription/CarDescription';
import Tires from "../../components/Sheets/Tires/Tires";
import MaintenancesHistory from "../../components/Sheets/MaintenancesHistory/MaintenancesHistory";
import LargeBtn from "../../components/Buttons/LargeBtn/LargeBtn";
import VehicleControl from "../../components/Sheets/VehicleControl/VehicleControl";

import {VscLoading} from 'react-icons/vsc'
import {AiFillCar} from 'react-icons/ai';

import { ApiContext } from "../../context/ApiContext";

import { Detran } from "../Reports/Scripts/Detran";

const Dashboard = () => {

    const {curVehicle, db, vehicles, maintenanceHistory} = useContext(ApiContext);

    const [isLoaded, setIsLoaded] = useState(false);

    const handleConsultaDetran = async() => {
        if(vehicles[curVehicle].ufOrigem == 'sc'){
            window.open(`https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${vehicles[curVehicle].placa}&renavam=${vehicles[curVehicle].renavam}`);
        }
        else if(vehicles[curVehicle].ufOrigem == 'pr'){
            await navigator.clipboard.writeText(vehicles[curVehicle].renavam);
            window.open('https://www.extratodebito.detran.pr.gov.br/detranextratos/geraExtrato.do?action=iniciarProcesso');
        }
    }

    useEffect (() => {  
       
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
        
    }, []);
    
    console.log(curVehicle)
    if(vehicles == [] || !isLoaded){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
                 <VscLoading className={styles.loading}/>
            </div>
        );
    }
    else if (vehicles == []){
        return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25rem'}}>
            Nenhum Veículo Encontrado
        </div>
        );
    }
    else {
            return(
                <Container>
                    <VerticalContainer>
                        <ListBox/>
                        <CarImage vehicles={vehicles} curVehicle={curVehicle}/>
                        <MechanicalPendences 
                        db={db} 
                        curVehicle={curVehicle}
                        />  
                    </VerticalContainer>
                    <VerticalContainer>
                        <CarDescription db={db} curVehicle={curVehicle}/>
                        <Tires db={db} curVehicle={curVehicle}/>
                    </VerticalContainer>
                    <VerticalContainer>
                        <LargeBtn 
                        title='Consulta Detran'
                        handleOnClick={() => Detran(vehicles[curVehicle].placa, vehicles[curVehicle].renavam, vehicles[curVehicle].ufOrigem)}
                        icon={<AiFillCar/>}
                        />
                        <VehicleControl curVehicle={curVehicle} vehicles={vehicles}/>
                        
                        <MaintenancesHistory 
                        history={maintenanceHistory} 
                        curVehicle={curVehicle}
                        />
                    </VerticalContainer>
            
                </Container>
            );         
    }
}

export default Dashboard;