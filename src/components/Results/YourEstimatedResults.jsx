import React, { useEffect, useState } from "react";
import "./YourEstimatedResults.css"; // Create this CSS file for styling
import calculateBreakpointFees from "./CalculateBreakpointFees";
import calculateProgramFee from "./CalculateProgramFee";
import calculateTierFee from "./CalculateTierFee";
import { Co2Sharp } from "@mui/icons-material";
const YourEstimatedResults = ({
  handleChange,
  getCalculationDataValue,
  feeType,
  setCalculationData,
  calculationData,
}) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("total-account-fees");
  const [fpValues, setFpValues] = useState({ rate: "", price: "" });
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
  const strategistFeeCaap = getCalculationDataValue("strategistFeeCaap");
  const strategistFeeCaapSmallAccount = getCalculationDataValue(
    "strategistFeeCaapSmallAccount"
  );

  useEffect(() => {
    const fpFeeType = getCalculationDataValue("FPfeeType");
    const accountValue = parseFloat(calculationData["account-value"]) || 0;
    const programType = getCalculationDataValue("paymentOption") || "";
    const teamDirectedInput =
      parseFloat(getCalculationDataValue("teamDirectedInput")) || 0;
    const AUADiscount =
      getCalculationDataValue("AdditionalDetails")?.auaDiscount || 0;
    const UmaSmaStrategistFee =
      getCalculationDataValue("UMA-SMA-Strategist-Fee") || [];
    const programOption = getCalculationDataValue("programOption") || "";
    if (fpFeeType === "flat") {
      const rate = parseFloat(calculationData.FPfeeFlat?.amount) || 0;
      const FPfeeFlat = accountValue !== 0 ? (rate / 100) * accountValue : 0;
      setFpValues({
        rate: rate,
        price: FPfeeFlat.toFixed(2),
      });
    } else if (fpFeeType === "fixed") {
      const price = parseFloat(calculationData.FPfeeFixed?.amount) || 0;
      const fpFeeFixedAmount =
        accountValue !== 0 ? (price / accountValue) * 100 : 0;
      setFpValues({
        rate: fpFeeFixedAmount.toFixed(2),
        price: price,
      });
    } else if (fpFeeType === "breakpoint") {
      const FPfeeBreakPoints = calculationData["FPfeeBreakPoints"];
      const breakpoints = [];
      const feePercentages = [];

      if (FPfeeBreakPoints) {
        Object.values(FPfeeBreakPoints).forEach((breakpoint) => {
          breakpoints.push(parseFloat(breakpoint.amount || 0));
          feePercentages.push(parseFloat(breakpoint.percentage || 0));
        });
      }

      if (breakpoints.length > 0 && feePercentages.length > 0 && accountValue) {
        const householdAUM = 1000;
        const results = calculateBreakpointFees(
          accountValue,
          householdAUM,
          breakpoints,
          feePercentages
        );
        if (results.length > 0 && accountValue) {
          const totalFee = results[0].fee;
          const rate = (totalFee / accountValue) * 100;
          const price = totalFee;

          setFpValues({
            rate: rate.toFixed(2),
            price: price.toFixed(2),
          });
        }
      }
    } else if (fpFeeType === "tier") {
      const householdAUM = 0;
      const FPfeeTiers = calculationData["FPfeeTiers"];
      const tiers = [];
      const feePercentages = [];

      if (FPfeeTiers) {
        Object.values(FPfeeTiers).forEach((tier) => {
          tiers.push(parseFloat(tier.amount || 0));
          feePercentages.push(parseFloat(tier.percentage || 0));
        });
      }
      if (tiers.length > 0 && feePercentages.length > 0 && accountValue) {
        const householdAUM = 1000;
        const results = calculateTierFee(
          accountValue,
          householdAUM,
          tiers,
          feePercentages
        );
        if (results?.totalTierFee > 0 && accountValue) {
          const totalFee = results?.totalTierFee;
          const rate = (totalFee / accountValue) * 100;
          const price = totalFee;

          setFpValues({
            rate: rate.toFixed(2),
            price: price.toFixed(2),
          });
        }
      }
    }

    if (programType && AUADiscount) {
      const pType = AUADiscount.replace(/%$/, "");
      const results = calculateProgramFee(accountValue, 0, programType, pType);

      // Validate results
      if (Array.isArray(results)) {
        // Assuming results is an array of numbers
        let totalRate = 0;
        results.forEach((result) => {
          totalRate += result;
        });
        const roundedTotalRate = Math.ceil(totalRate);
        const rate = (roundedTotalRate / accountValue) * 100;
        setProgramFeeValues({
          rate: rate.toFixed(2),
          price: roundedTotalRate,
        });
      }
    }
    if (teamDirectedInput) {
      const price = (teamDirectedInput / 100) * accountValue;
      setStrategistFeeValues({
        rate: teamDirectedInput,
        price: price,
      });
    }
    if (programType === "caap") {
      if (
        strategistFeeCaap &&
        Object.keys(strategistFeeCaap).length !== 0 &&
        accountValue !== 0
      ) {
        const percentageValue = strategistFeeCaap.value;
        const price =
          percentageValue !== 0 ? (percentageValue / 100) * accountValue : 0;
        setStrategistFeeValues({
          rate: percentageValue,
          price: price.toFixed(2),
        });
      }
    } else if (programType === "caap-small-account") {
      if (
        strategistFeeCaapSmallAccount &&
        Object.keys(strategistFeeCaapSmallAccount).length !== 0 &&
        accountValue !== 0
      ) {
        const percentageValue = strategistFeeCaapSmallAccount.value;
        const price =
          percentageValue !== 0 ? (percentageValue / 100) * accountValue : 0;
        setStrategistFeeValues({
          rate: percentageValue,
          price: price.toFixed(2),
        });
      }
    } else if (programType === "uma-sma") {
      const calculationData = getCalculationDataValue("UMA-SMA-Strategist-Fee");
      const sumResult = calculateTotal(calculationData);
      let dollarValue = 0;
      if (accountValue && accountValue !== 0) {
        dollarValue = (sumResult / 100) * accountValue;
        dollarValue = parseFloat(dollarValue.toFixed(2)); // Ensure dollarValue is a number with two decimals
      }

      setStrategistFeeValues({
        rate: parseFloat(sumResult).toFixed(2),
        price: dollarValue || 0,
      });
    }
  }, [calculationData]);

  useEffect(() => {
    const programOption = getCalculationDataValue("programOption") || "";
    const accountValue = parseFloat(calculationData["account-value"]) || 0;
    const fundExpences =
      parseFloat(getCalculationDataValue("AdditionalDetails")?.fundExpenses) ||
      0;
    const fpPayout = parseFloat(
      getCalculationDataValue("AdditionalDetails")?.fpPayOut || 0
    );
    // Calculate the total fee whenever the relevant fee states change
    if (programOption) {
      let totalAccountFee = 0;
      let netAnnualFee = 0;
      if (programOption === "fp") {
        totalAccountFee =
          parseFloat(fpValues.rate || 0) +
          parseFloat(programFeeValues.rate || 0);

        //Annual Fee

        netAnnualFee =
          parseFloat(fpValues.price || 0) -
          parseFloat(programFeeValues.price || 0);
      } else if (programOption === "client") {
        totalAccountFee =
          parseFloat(fpValues.rate || 0) +
          parseFloat(programFeeValues.rate || 0) +
          parseFloat(strategistFeeValues.rate || 0);
        //Annual Fee

        netAnnualFee = parseFloat(fpValues.price || 0);
      }
      let dollerValue = (totalAccountFee / 100) * accountValue;
      setTotalAccountFeeValues({
        rate: totalAccountFee.toFixed(2),
        price: dollerValue.toFixed(2),
      });
      let percentageValue = (netAnnualFee / accountValue) * 100;
      setNetAnnualFeeValues({
        rate: percentageValue.toFixed(2),
        price: netAnnualFee.toFixed(2),
      });
    }
    const totalClientFees =
      parseFloat(fpValues.rate || 0) +
      parseFloat(programFeeValues.rate || 0) +
      parseFloat(strategistFeeValues.rate || 0) +
      parseFloat(fundExpences);
    let clientDollerValue = (totalClientFees / 100) * accountValue;
    setTotalClientFeeValues({
      rate: totalClientFees.toFixed(2),
      price: clientDollerValue.toFixed(2),
    });
    let grossannualfee;
    if (fpPayout && fpPayout != 0) {
      grossannualfee = parseFloat(fpValues.rate);
    } else {
      grossannualfee = "N/A";
    }
    let grossAnnualFeeDollerValue =
      grossannualfee !== "N/A" ? (grossannualfee / 100) * accountValue : "N/A";

    setgrossAnnualFeeValues({
      rate: grossannualfee,
      price: grossAnnualFeeDollerValue,
    });
  }, [fpValues, programFeeValues, strategistFeeValues]);

  const calculateTotal = (funds) => {
    return funds.reduce((acc, fund) => {
      const enteredValue = parseFloat(fund.inputValue) || 0;
      const bps = parseFloat(fund.value) || 0;
      return acc + (enteredValue * bps) / 100;
    }, 0);
  };

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "total-account-fees":
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">Financial Professional Fee</div>
              <div className="result-value">{fpValues.rate || "N/A"}</div>
              <div className="result-value">{fpValues.price || "N/A"}</div>
            </div>
            {/* <div className="divider" />
            <div className="result-row">
              <div className="result-label">
                Net - Program fee paid by client was selected
              </div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div> */}
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Program Fee</div>
              <div className="result-value">
                {programFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {programFeeValues.price || "N/A"}
              </div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Strategist Fee (if applicable)</div>
              <div className="result-value">
                {strategistFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {strategistFeeValues.price || "N/A"}
              </div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Total Account Fee (annualized)</div>
              <div className="result-value">
                {totalAccountFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {totalAccountFeeValues.price || "N/A"}
              </div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">
                Total Client Fees (including Fund Expenses)
              </div>
              <div className="result-value">
                {totalClientFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {totalClientFeeValues.price || "N/A"}
              </div>
            </div>
          </div>
        );
      case "additional-detail":
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">
                Gross Annual Fee to Financial Professional
              </div>
              <div className="result-value">
                {grossAnnualFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {grossAnnualFeeValues.price || "N/A"}
              </div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">
                Net Annual Fee to Financial Professional
              </div>
              <div className="result-value">
                {netAnnualFeeValues.rate || "N/A"}
              </div>
              <div className="result-value">
                {netAnnualFeeValues.price || "N/A"}
              </div>
            </div>
          </div>
        );
      case "summary":
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">Financial Professional Fee</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">
                Net - Program fee paid by client was selected
              </div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="results-container">
      <div className="results-title">Your Estimated Results</div>
      <div className="tabs-container">
        <div
          className={`tab ${
            activeTab === "total-account-fees" ? "active" : ""
          }`}
          onClick={() => handleTabSwitch("total-account-fees")}
        >
          Total Account Fees
          <div
            className={`tab-underline ${
              activeTab === "total-account-fees" ? "active" : ""
            }`}
          />
        </div>
        <div
          className={`tab ${activeTab === "additional-detail" ? "active" : ""}`}
          onClick={() => handleTabSwitch("additional-detail")}
        >
          Additional Detail
          <div
            className={`tab-underline ${
              activeTab === "additional-detail" ? "active" : ""
            }`}
          />
        </div>
        <div
          className={`tab ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => handleTabSwitch("summary")}
        >
          Summary
          <div
            className={`tab-underline ${
              activeTab === "summary" ? "active" : ""
            }`}
          />
        </div>
      </div>
      <div className="iconsContainer">
        <div className="min-width-half"></div>
        <div className="flex-container">
          <div className="rate-label labels">Rate(%)</div>
          <div className="price-label labels">Price($)</div>
        </div>
      </div>

      <div className="divider" />
      <div className="results-content">{renderTabContent()}</div>
    </div>
  );
};

export default YourEstimatedResults;
