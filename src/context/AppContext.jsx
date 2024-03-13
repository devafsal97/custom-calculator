import { Calculate } from "@mui/icons-material";
import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [feePaidBy, setFeePaidBy] = useState("");
  const [fundExpenses, setFundExpenses] = useState("");

  const [financialProfessionalFeeType, setFinancialProfessionalFeeType] =
    useState("");
  const [auaDiscount, setAuaDiscount] = useState(0);
  const [rows, setRows] = useState([
    {
      name: "Financial Professional Fee",
      percentage: "N/A",
      value: "N/A",
    },
    {
      name: "Program Fee",
      percentage: "N/A",
      value: "N/A",
    },
    {
      name: "Strategist Fee (if applicable)",
      percentage: "N/A",
      value: "N/A",
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

  const [additionalDetailsRows, setAdditionalDetailsRows] = useState([
    {
      name: "Gross Annual Fee to Financial Professional",
      percentage: "N/A",
      value: "N/A",
    },
    {
      name: "Net Annual Fee to Financial Professional",
      percentage: "N/A",
      value: "N/A",
    },
  ]);

  useEffect(() => {
    // Extract relevant rows
    const financialProfessionalFee = rows.find(
      (row) => row.name === "Financial Professional Fee"
    );
    const programFee = rows.find((row) => row.name === "Program Fee");
    const strategistFee = rows.find(
      (row) => row.name === "Strategist Fee (if applicable)"
    );

    // Serialize the relevant data for dependency tracking
    const serializedDeps = JSON.stringify({
      financialProfessionalFee: {
        percentage: financialProfessionalFee?.percentage,
        value: financialProfessionalFee?.value,
      },
      programFee: {
        percentage: programFee?.percentage,
        value: programFee?.value,
      },
      strategistFee: {
        percentage: strategistFee?.percentage,
        value: strategistFee?.value,
      },
    });

    // Effect logic here, which will only run when serializedDeps changes
    let financialProfessionalFeePercentage = parseFloat(
      financialProfessionalFee?.percentage || 0
    );
    let programFeePercentage =
      parseFloat(programFee?.percentage.replace("%", "")) || 0;
    let strategistFeePercentage =
      parseFloat(strategistFee?.percentage.replace("%", "")) || 0;

    let financialProfessionalFeeDollar =
      parseFloat(financialProfessionalFee?.value.replace("$", "")) || 0;
    let programFeeDollar = parseFloat(programFee?.value.replace("$", "")) || 0;
    let strategistFeeDollar =
      parseFloat(strategistFee?.value.replace("$", "")) || 0;

    // console.log("feePaidBy", feePaidBy);
    let totalPercentage =
      feePaidBy === "Paid by FP"
        ? financialProfessionalFeePercentage + strategistFeePercentage
        : financialProfessionalFeePercentage +
          programFeePercentage +
          strategistFeePercentage;
    let totalValue =
      feePaidBy === "Paid by FP"
        ? financialProfessionalFeeDollar + strategistFeeDollar
        : financialProfessionalFeeDollar +
          programFeeDollar +
          strategistFeeDollar;

    const updatedRows = rows.map((row) => {
      if (row.name === "Total Account Fee (annualized)") {
        return {
          ...row,
          percentage: `${totalPercentage}%`,
          value: `$${totalValue}`,
        };
      }
      return row;
    });

    setRows(updatedRows);
  }, [
    JSON.stringify({
      financialProfessionalFeePercentage: rows.find(
        (row) => row.name === "Financial Professional Fee"
      )?.percentage,
      financialProfessionalFeeValue: rows.find(
        (row) => row.name === "Financial Professional Fee"
      )?.value,
      programFeePercentage: rows.find((row) => row.name === "Program Fee")
        ?.percentage,
      programFeeValue: rows.find((row) => row.name === "Program Fee")?.value,
      strategistFeePercentage: rows.find(
        (row) => row.name === "Strategist Fee (if applicable)"
      )?.percentage,
      strategistFeeValue: rows.find(
        (row) => row.name === "Strategist Fee (if applicable)"
      )?.value,
    }),
    feePaidBy,
  ]);

  useEffect(() => {
    if (fundExpenses) {
      const financialProfessionalFee = rows.find(
        (row) => row.name === "Financial Professional Fee"
      );
      const programFee = rows.find((row) => row.name === "Program Fee");
      const strategistFee = rows.find(
        (row) => row.name === "Strategist Fee (if applicable)"
      );

      let financialProfessionalFeePercentage =
        parseFloat(financialProfessionalFee?.percentage.replace("%", "")) || 0;
      let programFeePercentage =
        parseFloat(programFee?.percentage.replace("%", "")) || 0;
      let strategistFeePercentage =
        parseFloat(strategistFee?.percentage.replace("%", "")) || 0;

      let financialProfessionalFeeDollar =
        parseFloat(financialProfessionalFee?.value.replace("$", "")) || 0;
      let programFeeDollar =
        parseFloat(programFee?.value.replace("$", "")) || 0;
      let strategistFeeDollar =
        parseFloat(strategistFee?.value.replace("$", "")) || 0;

      let numericAccountValue = parseFloat(
        accountValue.replace(/[^0-9.-]+/g, "")
      );
      let numnericFundExpense = parseFloat(
        fundExpenses.replace(/[^0-9.-]+/g, "")
      );

      let totalPercentage =
        financialProfessionalFeePercentage +
        programFeePercentage +
        strategistFeePercentage +
        numnericFundExpense;

      //console.log("totalPercentage", totalPercentage);
      const updatedRows = rows.map((row) => {
        if (row.name === "Total Client Fees (including Fund Expenses)") {
          return {
            ...row,
            percentage: totalPercentage + "%",
            value: (numericAccountValue * totalPercentage) / 100,
          };
        }
        return row;
      });

      setRows(updatedRows);
    }
  }, [
    JSON.stringify({
      financialProfessionalFeePercentage: rows.find(
        (row) => row.name === "Financial Professional Fee"
      )?.percentage,
      financialProfessionalFeeValue: rows.find(
        (row) => row.name === "Financial Professional Fee"
      )?.value,
      programFeePercentage: rows.find((row) => row.name === "Program Fee")
        ?.percentage,
      programFeeValue: rows.find((row) => row.name === "Program Fee")?.value,
      strategistFeePercentage: rows.find(
        (row) => row.name === "Strategist Fee (if applicable)"
      )?.percentage,
      strategistFeeValue: rows.find(
        (row) => row.name === "Strategist Fee (if applicable)"
      )?.value,
    }),
    fundExpenses,
  ]);
  const removeExtraPeriods = (value) => {
    const firstPeriodIndex = value.indexOf(".");

    if (firstPeriodIndex === -1) {
      return value;
    }
    const beforeFirstPeriod = value.substring(0, firstPeriodIndex + 1);
    const afterFirstPeriod = value.substring(firstPeriodIndex + 1);
    const cleanedAfterFirstPeriod = afterFirstPeriod.replace(/\./g, "");
    return beforeFirstPeriod + cleanedAfterFirstPeriod;
  };
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
        feePaidBy,
        setFeePaidBy,
        auaDiscount,
        setAuaDiscount,
        additionalDetailsRows,
        setAdditionalDetailsRows,
        fundExpenses,
        setFundExpenses,
        removeExtraPeriods,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
