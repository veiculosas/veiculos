import { createContext, useEffect, useState } from "react";

import {getFirestore, getDocs, getDoc, collection, doc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDa8BEdqlO1Pt9WIXIXA2Xo58qmtbe5InM",
    authDomain: "asssistencia-2023.firebaseapp.com",
    databaseURL: "https://asssistencia-2023-default-rtdb.firebaseio.com",
    projectId: "asssistencia-2023",
    storageBucket: "asssistencia-2023.appspot.com",
    messagingSenderId: "312564370922",
    appId: "1:312564370922:web:fda99435586b629dd7b693",
    measurementId: "G-2HQY8Y1PDD"
});

export const ApiContext = createContext();

export const ApiProvider = ({children}) => {

    const db = getFirestore(firebaseApp);

    const [curVehicle, setCurVehicle] = useState();

    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [tires, setTires] = useState([]);
    const [insurances, setInsurances] = useState([]);
    const [activities, setActivities] = useState([]);
    const [maintenanceHistory, setMaintenanceHistory] = useState([]);
    const [mechanicalPendences, setMechanicalPendences] = useState([]);
    const [images, setImages] = useState([]);
    const [unities, setUnities] = useState([]);

    var veh = [];

        
    //Creates functions to call database from any child component.
    const getVehicles = async() => {
        veh = (await(getDoc(doc(db, 'assistencia', 'veiculos')))).data()
        setVehicles(veh);  
        const sortedVeh = Object.keys(veh).sort((a, b) => {
            return veh[a].modelo < veh[b].modelo ? -1 : 1;
        });
        if(curVehicle == undefined){
            setCurVehicle(sortedVeh[0]);
        }   
    };
    const getDrivers = async() => {
        setDrivers((await(getDoc(doc(db, 'assistencia', 'condutores')))).data());      
    };
    const getTires = async() => {
        setTires((await(getDoc(doc(db, 'assistencia', 'pneus')))).data());      
    };
    const getInsurances = async() => {
        setInsurances((await(getDoc(doc(db, 'assistencia', 'seguros')))).data());      
    };
    const getActivities = async() => {
        setActivities((await(getDoc(doc(db, 'assistencia', 'atividades')))).data());      
    };
    const getMaintenanceHistory = async() => {
        setMaintenanceHistory((await (getDoc(doc(db, 'assistencia', 'historicoMec')))).data());
    };
    const getMechanicalPendences = async() => {
        setMechanicalPendences((await(getDoc(doc(db, 'assistencia', 'pendenciasMec')))).data());
    };
    const getImages = async() => {
        setImages((await (getDoc(doc(db, 'imgs', 'vehicles')))).data());
    };
    const getUnities = async() => {
        setUnities((await(getDoc(doc(db, 'assistencia', 'unidades')))).data());
    };  

    useEffect(() => {
        getVehicles();
        getDrivers();
        getTires();
        getInsurances();
        getActivities();
        getMaintenanceHistory();
        getMechanicalPendences();
        getImages();
        getUnities();
    }, [])

   return (
    <ApiContext.Provider value={{
        curVehicle, 
        setCurVehicle, 
        db, 
        getVehicles, 
        getDrivers, 
        getTires, 
        getInsurances, 
        getActivities, 
        getMaintenanceHistory, 
        getMechanicalPendences,
        getImages,
        getUnities,
        vehicles,
        drivers,
        tires,
        insurances,
        activities,
        maintenanceHistory,
        mechanicalPendences,
        images,
        unities
        }}>
        {children}
    </ApiContext.Provider>
    );
}