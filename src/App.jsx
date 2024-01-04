import Header from "./components/Header/Header.jsx";
import Dashboard from './screens/Dashboard/Dashboard.jsx'
import './App.css';

import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { ApiProvider } from "./context/ApiContext.jsx";
import { ScreenProvider, ScreenContext } from "./context/ScreenContext.jsx";

import { useContext, useEffect, useState } from "react";
import ManangeVehicles from "./screens/ManangeVehicles/ManangeVehicles.jsx";
import Drivers from "./screens/Drivers/Drivers.jsx";
import { LoginScreen } from "./screens/Login/LoginScreen.jsx";
import { Reports } from "./screens/Reports/Reports.jsx";

function App() {
  
  const {curScreen} = useContext(ScreenContext);
  const {currentUser} = useContext(UserContext);

  const [selectedScreen, setSelectedScreen] = useState(curScreen);

  const [isLogged, setIsLogged] = useState(false);

  const changeSelectedScreen = (screen) => {
    setSelectedScreen(screen);
  };

  const screens = ['Visão Geral', 'Gerenciar Veículos', 'Condutores', 'Relatórios'];

  return (

    <div className="App">
      
      <UserProvider>
        {currentUser == null ?
          <LoginScreen/>
        :
        <ScreenProvider>
          <ApiProvider>
            <Header handleOnClick={(screen) => changeSelectedScreen(screen)} screens={screens}/>
            {selectedScreen == 'Visão Geral' && <Dashboard/>}
            {selectedScreen == 'Gerenciar Veículos' && <ManangeVehicles/>}
            {selectedScreen == 'Condutores' && <Drivers/>}
            {selectedScreen == 'Relatórios' && <Reports/>}
          </ApiProvider>
        </ScreenProvider>
        }
      </UserProvider>      
      
    </div>

  );
}

export default App;
