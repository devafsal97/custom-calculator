import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Styles from "./app.module.css";
import Fpfee from "./pages/fpfee/Fpfee";
import ProgramFee from "./pages/programfee/ProgramFee";
import { AppProvider } from "./context/AppContext";
import Strategist from "./pages/strategist/StrategistFee";
import UmaSmaAllocations from "./pages/umasmaallocations/UmaSmaAllocations";
import AdditionalPage from "./pages/additionalpage/AdditionalPage";
import ResultPage from "./pages/resultpage/ResultPage";
import { useState } from "react";
import "./global.css";
import StepIndicator from "./components/stepindicator/StepIndicator";
import CalculatorPage from "./pages/calculator/Calculator";
import { CalculationStorageProvider } from "./context/StorageContext";

function App() {
  // const [currentPage, setCurrentPage] = useState('HomePage');
  // const navigate = (page) => {
  //   setCurrentPage(page);
  // };
  return (
    // <div className={Styles.appContainer}>
    // <StepIndicator currentStep={currentPage}></StepIndicator>
    // <AppProvider>
    // {currentPage === 'HomePage' && <HomePage onNavigate={navigate} />}
    // {currentPage === 'FpFee' && <Fpfee onNavigate={navigate} />}
    // {currentPage === 'ProgramFee' && <ProgramFee onNavigate={navigate} />}
    // {currentPage === 'StrategistFee' && <Strategist onNavigate={navigate} />}
    // {currentPage === 'UmaSma' && <UmaSmaAllocations onNavigate={navigate} />}
    // {currentPage === 'AdditionalPage' && <AdditionalPage onNavigate={navigate} />}
    // {currentPage === 'ResultPage' && <ResultPage onNavigate={navigate} />}
    // </AppProvider>
    // </div>
    <CalculationStorageProvider>
      <CalculatorPage />
    </CalculationStorageProvider>
  );
}

export default App;
