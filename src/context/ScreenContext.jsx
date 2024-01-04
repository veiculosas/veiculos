import { createContext, useEffect, useState } from "react";
import Dashboard from "../screens/Dashboard/Dashboard";

export const ScreenContext = createContext();

export const ScreenProvider = ({children}) => {

    const [curScreen, setCurScreen] = useState ('Visão Geral');
    
    
    return (
    <ScreenContext.Provider value={{curScreen, setCurScreen}}>
        {children}
    </ScreenContext.Provider>
    );
}