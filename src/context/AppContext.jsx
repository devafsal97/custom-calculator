import React, { createContext, useContext, useState } from "react";

// Create a new context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Define your state variables here
  const [fpFee, setFpFee] = useState("Advisor-directed");
  const [selectedMFEFTItems, setSelectedMFEFTItems] = useState([]);
  const [selectedEquitySMAItems, setSelectedEquitySMAItems] = useState([]);
  const [accountValue, setAccountValue] = useState("");
  const [columns, setColumns] = useState(["", "%", "$"]);
  const [tiers, setTiers] = useState([{ tier: "", fee: "" }]);
  const [breakPoints, setBreakPoints] = useState([{ breakpoint: "", fee: "" }]);
  const [teamDirectedValue, setTeamDirectedValue] = useState("");
  const [strategistCaapSas, setStrategistCaapSas] = useState("");
  const [strategistCaap, setStrategistCaap] = useState("");
  const [houseAUM, setHouseAUM] = useState(0);
  const [financialProfessionalFeeType, setFinancialProfessionalFeeType] =
    useState("");
  const [rows, setRows] = useState([
    {
      name: "Financial Professional Fee",
      percentage: "N/A",
      value: "N/A",
    },
    {
      name: "Program Fee",
      percentage: "0.99%",
      value: "$987",
    },
    {
      name: "Strategist Fee (if applicable)",
      percentage: "A",
      value: "A",
    },
    {
      name: "Total Account Fee (annualized)",
      percentage: "N/A",
      value: "N/A",
    },
    {
      name: "Total Client Fees (including Fund Expenses)",
      percentage: "N/A",
      value: "N/A",
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        fpFee,
        setFpFee,
        selectedMFEFTItems,
        setSelectedMFEFTItems,
        selectedEquitySMAItems,
        setSelectedEquitySMAItems,
        accountValue,
        setAccountValue,
        columns,
        rows,
        setRows,
        tiers,
        setTiers,
        financialProfessionalFeeType,
        setFinancialProfessionalFeeType,
        teamDirectedValue,
        setTeamDirectedValue,
        strategistCaapSas,
        setStrategistCaapSas,
        strategistCaap,
        setStrategistCaap,
        houseAUM,
        breakPoints,
        setBreakPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
