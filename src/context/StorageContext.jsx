import React, { useState, useContext, createContext, useEffect } from "react";

// Create the context
const CalculationStorageContext = createContext();

// Create the provider component
const CalculationStorageProvider = ({ children }) => {
  const [errorMessages,setErrorMessages] = useState([])
  const [stepsCompleted, setStepsCompleted] = useState(false);
  const [render, setRender] = useState(false);
  const [accountValue, setAccountValue] = useState({
    rate: "",
    price: "",
  });
  const [fundExpenses, setFundExpenses] = useState({
    rate: "",
    price: "",
  });

  const [fpPayout, setFpPayout] = useState({
    rate: "",
    price: "",
  });

  const [houseHoldValue, setHouseHoldValue] = useState({
    rate: "",
    price: "",
  });
  const [feeType, setFeeType] = useState();
  const [programFee, setProgramFee] = useState();

  const [programFeeValues, setProgramFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [strategistFeeValues, setStrategistFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [totalAccountFeeValues, setTotalAccountFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [totalClientFeeValues, setTotalClientFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [grossAnnualFeeValues, setgrossAnnualFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [netAnnualFeeValues, setNetAnnualFeeValues] = useState({
    rate: "",
    price: "",
  });
  const [fpValues, setFpValues] = useState({ rate: "", price: "" });
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
        programFeeValues,
        setProgramFeeValues,
        strategistFeeValues,
        setStrategistFeeValues,
        totalAccountFeeValues,
        setTotalAccountFeeValues,
        totalClientFeeValues,
        setTotalClientFeeValues,
        grossAnnualFeeValues,
        setgrossAnnualFeeValues,
        netAnnualFeeValues,
        setNetAnnualFeeValues,
        fpValues,
        setFpValues,
        accountValue,
        setAccountValue,
        fundExpenses,
        setFundExpenses,
        fpPayout,
        setFpPayout,
        houseHoldValue,
        setHouseHoldValue,
        feeType,
        setFeeType,
        programFee,
        setProgramFee,
        render,
        setRender,
        stepsCompleted,
        setStepsCompleted,errorMessages,setErrorMessages
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
