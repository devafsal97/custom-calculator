import logo from './logo.svg';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Styles from "./app.module.css"
import Fpfee from './pages/fpfee/Fpfee';
import ProgramFee from './pages/programfee/ProgramFee';
import { AppProvider } from './context/AppContext';
import Strategist from './pages/strategist/StrategistFee';
import UmaSmaAllocations from './pages/umasmaallocations/UmaSmaAllocations';



function App() {
  return (
    <div className={Styles.appContainer}>
    <AppProvider>
    <BrowserRouter>
    <Routes>
            <Route path='/' Component={HomePage} />
            <Route path='/fpfee' Component={Fpfee} />
            <Route path='/programfee' Component={ProgramFee} />
            <Route path='/strategistfee' Component={Strategist}/>
            <Route path='/umasma' Component={UmaSmaAllocations}/>
    </Routes>
    </BrowserRouter>
    </AppProvider>
    </div>
  );
}

export default App;
