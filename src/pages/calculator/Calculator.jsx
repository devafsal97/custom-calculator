import React, { useState } from 'react';
import "./calculator.css";
import FinancialProfessionalFee from "../../components/FPFee/FinancialProfessionalFee";
import ProgramFeeSelection from "../../components/ProgramFee/ProgramFeeSelection";
import ProgramFeePayment from "../../components/ProgramFeePayment/ProgramFeePayment";
import ProgramFeeDetails from "../../components/ProgramFeeDetails/ProgramFeeDetails";
import StrategistFee from '../../components/CaapAndSas/StrategistFee';
import AdditionalDetail from '../../components/AdditionalDetail/AdditionalDetail';
import StepIndicator from '../../components/StepIndicatorFolder/StepIndicator';
import YourEstimatedResults from '../../components/Results/YourEstimatedResults';
import StepFooter from '../../components/StepFooter/StepFooter';

function CalculatorPage() {
  const [completedSteps, setCompletedSteps] = useState([0]); // Step 0: Enter Account Value
  const [selectedOption, setSelectedOption] = useState('');

  // const handleFinancialProfessionalFeeComplete = () => {
  //   if (!completedSteps.includes(1)) {
  //     setCompletedSteps((prev) => [...prev, 1]);
  //   }
  // };

  // const handleProgramFeeSelectionComplete = () => {
  //   if (!completedSteps.includes(2)) {
  //     setCompletedSteps((prev) => [...prev, 2]);
  //   }
  // };

  // const handleStrategistFeeComplete = () => {
  //   if (!completedSteps.includes(3)) {
  //     setCompletedSteps((prev) => [...prev, 3]);
  //   }
  // };

  // const handleAdditionalDetailComplete = () => {
  //   if (!completedSteps.includes(4)) {
  //     setCompletedSteps((prev) => [...prev, 4]);
  //   }
  // };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // handleProgramFeeSelectionComplete();
  };
  return (

    <div>
     
      {/* Header Section */}
      <div className="headerContainer">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/16a0bf8ee9915a3c1274ab46ee5f5cd31e6b2e149ae5785312a1e6ed4b606161?apiKey=f95b5ca361ef4526b1cb461f7b2405ea&"
          className="logoImage"
        />
      </div>
      <div className="filler-top"></div>
      <div className='calculation-wrapper-outer'>
      <div className='calculation-left'>

      {/* Main Content Section */}
      <h1> WealthPort Fee Calculator</h1>
      <div className="container">
        <div className="contentWrapper">
          <div className="imageColumn">
            <img
              loading="lazy"
              src="/icon.svg"
              className="featureImage"
            />
          </div>
          <div className="textColumn">
            <div className="description">
              Use this tool to calculate the estimated account fees for any WealthPort program fee type or to compare investment options. Save each estimate's unique link to share or revisit directly through your browser. Export your estimate to an Excel or PDF to quickly share and analyze your estimated fees.
              <br />
              <p>
              Get Started below.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Section */}
      <div className="filler"></div>
      <div className="scenario-container">
        <div className="scenario-header">Enter a Name for this Scenario</div>
        <div className="scenario-label">Scenario Name</div>
        <input className="scenario-input" type="text" />
      </div>

      {/* Account Value Section */}
      <div className="filler"></div>
      <div className="account-value-container">
        <div className="header-title">Enter Account Value</div>
        <div className="label-title">Account Value</div>
        <input className="scenario-input" type="number" />
      </div>

      {/* Financial Professional Fee Section */}
      <div className="filler"></div>
      <FinancialProfessionalFee></FinancialProfessionalFee>

      {/* Select Program Fee Section */}
      <div className="filler"></div>
      <ProgramFeeSelection onOptionChange={handleOptionChange} />
    

      {/* Program Fee Payment Section */}
      <div className="filler"></div>
      <ProgramFeePayment></ProgramFeePayment>

     

      {/* Strategist Fee Section */}

      {/* <ProgramFeeDetails selectedOption={selectedOption} /> */}
      <div className="filler"></div>
      <StrategistFee feeType={selectedOption}  ></StrategistFee>
   

      {/* Additional Details Section */}
      <div className="filler"></div>

      <AdditionalDetail ></AdditionalDetail>
      <div className="filler"></div>

      </div>
      <div className='calculation-right'>
      <StepIndicator/>
      <YourEstimatedResults></YourEstimatedResults>
      </div>
     
      </div>
      <div className="filler-top"></div>
      <StepFooter></StepFooter>
    </div>
  );
}



export default CalculatorPage;
