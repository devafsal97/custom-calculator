import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const CalculationStorageContext = createContext();

// Create the provider component
const CalculationStorageProvider = ({ children }) => {
  // Calculation details
  const navigate = useNavigate();
  const [tierValueSum, setTierValueSum] = useState([
    {
      doller: "",
      percentage: "",
    },
  ]);
  const [breakPointValueSum, setBreakPointValueSum] = useState([
    {
      doller: "",
      percentage: "",
    },
  ]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [stepsCompleted, setStepsCompleted] = useState(false);

  const [accountValue, setAccountValue] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [fundExpenses, setFundExpenses] = useState([
    {
      rate: "",
      price: "",
    },
  ]);

  const [fpPayout, setFpPayout] = useState([
    {
      rate: "",
      price: "",
    },
  ]);

  const [houseHoldValue, setHouseHoldValue] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [feeType, setFeeType] = useState([]);
  const [programFee, setProgramFee] = useState([]);

  const [programFeeValues, setProgramFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [strategistFeeValues, setStrategistFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [totalAccountFeeValues, setTotalAccountFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [totalClientFeeValues, setTotalClientFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [grossAnnualFeeValues, setgrossAnnualFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [netAnnualFeeValues, setNetAnnualFeeValues] = useState([
    {
      rate: "",
      price: "",
    },
  ]);
  const [fpValues, setFpValues] = useState([{ rate: "", price: "" }]);

  // Index

  const [index, setIndex] = useState(0);
  const [originalIndex, setOriginalIndex] = useState(null);

  // User Inputs

  const [calculationData, setCalculationData] = useState({
    "scenario-name": [""],
    "account-value": [""],
    FPfee: [{}],
    AdditionalDetails: [
      { auaDiscount: "0%", fpPayOut: "", fundExpenses: "", houseHoldValue: "" },
      { auaDiscount: "0%", fpPayOut: "", fundExpenses: "", houseHoldValue: "" },
      { auaDiscount: "0%", fpPayOut: "", fundExpenses: "", houseHoldValue: "" },
    ],
    paymentOption: ["", "", ""],
    programOption: [""],
    "UMA-SMA-Strategist-Fee": [],
    FPfeeType: [""],
    FPfeeTiers: [
      {
        tier1: {
          amount: "",
          percentage: "",
        },
        tier2: {
          amount: "",
          percentage: "",
        },
      },
      {
        tier1: {
          amount: "",
          percentage: "",
        },
        tier2: {
          amount: "",
          percentage: "",
        },
      },
      {
        tier1: {
          amount: "",
          percentage: "",
        },
        tier2: {
          amount: "",
          percentage: "",
        },
      },
    ],
    FPfeeBreakPoints: [
      {
        breakpoint1: {
          amount: "",
          percentage: "",
        },
        breakpoint2: {
          amount: "",
          percentage: "",
        },
      },
      {
        breakpoint1: {
          amount: "",
          percentage: "",
        },
        breakpoint2: {
          amount: "",
          percentage: "",
        },
      },
      {
        breakpoint1: {
          amount: "",
          percentage: "",
        },
        breakpoint2: {
          amount: "",
          percentage: "",
        },
      },
    ],
    FPfeeFixed: [""],
    FPfeeFlat: [""],
    strategistFeeCaap: [{}],
    strategistFeeCaapSmallAccount: [{}],
    teamDirectedInput: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (e.target.type === "number" &&
        value !== "" &&
        Number(value.amount) < 0) ||
      Number(value) < 0
    ) {
      return;
    } else if (name === "FPfeeBreakPoints" || name === "FPfeeTiers") {
      // for (const key in value) {
      //   if (value.hasOwnProperty(key)) {
      //     const tier = value[key];
      //     const amount = parseFloat(tier.amount) || 0;
      //     const percentage = parseFloat(tier.percentage) || 0;
      //     console.log(percentage, amount, "percentage,amount");
      //     // Check for negative values
      //     if (amount < 0 || percentage < 0) {
      //       return;
      //     }
      //   }
      // }
    }
    const newArray = [...calculationData[name]];
    newArray[index] = value;
    setCalculationData((prev) => ({ ...prev, [name]: newArray }));
  };
  const getCalculationDataValue = (key) => {
    return calculationData[key];
  };
  // useEffect(() => {
  //   console.log(calculationData);
  // }, [calculationData]);
 const handleEdit = (currentIndex) => {
    setOriginalIndex(index);
    setIndex(currentIndex);
    navigate("/");
  };
  console.log("originalIndex  == ",originalIndex, "index is == ",index );
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
        stepsCompleted,
        setStepsCompleted,
        errorMessages,
        setErrorMessages,
        tierValueSum,
        setTierValueSum,
        breakPointValueSum,
        setBreakPointValueSum,
        index,
        setIndex,
        originalIndex,
        setOriginalIndex,handleEdit,
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
