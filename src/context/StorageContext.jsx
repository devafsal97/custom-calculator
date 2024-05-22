import React, { useState, useContext, createContext, useEffect } from "react";

// Create the context
const CalculationStorageContext = createContext();

// Create the provider component
const CalculationStorageProvider = ({ children }) => {
  const [calculationData, setCalculationData] = useState({
    "scenario-name": "",
    "account-value": "",
    FPfee: {},
    AdditionalDetails: { auaDiscount: "0%", fpPayOut: "", fundExpenses: "" },
    paymentOption: "",
    programOption: "",
    "UMA-SMA-Strategist-Fee": [],
    FPfeeType: "",
    FPfeeTiers: {
      tier1: {
        amount: "",
        percentage: "",
      },
      tier2: {
        amount: "",
        percentage: "",
      },
    },
    FPfeeBreakPoints: {
      breakpoint1: {
        amount: "",
        percentage: "",
      },
      breakpoint2: {
        amount: "",
        percentage: "",
      },
    },
    FPfeeFixed: "",
    FPfeeFlat: "",
    strategistFeeCaap: {},
    strategistFeeCaapSmallAccount: {},
    teamDirectedInput: {},
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCalculationData((prev) => ({ ...prev, [name]: value }));
  };
  const getCalculationDataValue = (key) => {
    return calculationData[key];
  };
  useEffect(() => {
    console.log(calculationData);
  }, [calculationData]);
  return (
    <CalculationStorageContext.Provider
      value={{
        calculationData,
        setCalculationData,
        handleChange,
        getCalculationDataValue,
      }}
    >
      {children}
    </CalculationStorageContext.Provider>
  );
};

// Create a custom hook to use the context
const useCalculationStorage = () => {
  return useContext(CalculationStorageContext);
};

export { CalculationStorageProvider, useCalculationStorage };
