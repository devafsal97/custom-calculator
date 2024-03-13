import Styles from "./fpfee.module.css";
import Button from "../../components/button/Button";
import Radio from "../../components/radiobutton/Radio";
import { useState, useEffect } from "react";
import Flat from "./flat/Flat";
import Fixed from "./fixed/Fixed";
import Tier from "./tier/Tier";
import Breakpoint from "./breakpoint/Breakpoint";
import TabComponent from "../../components/tab/Tab";
import { useNavigate } from "react-router-dom";
import ToolTip from "../../components/tooltip/ToolTip";
import { useAppContext } from "../../context/AppContext";

const Fpfee = ({ onNavigate }) => {
  const {
    rows,
    setRows,
    accountValue,
    tiers,
    setTiers,
    financialProfessionalFeeType,
    setFinancialProfessionalFeeType,
    houseAUM,
    breakPoints,
    calculateTotalAccountFee,
    removeExtraPeriods,
  } = useAppContext();

  const [flatValue, setFlatValue] = useState("0%");
  const [fixedValue, setFixedValue] = useState("$0");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showTierSumOfError, setShowTierSumOfError] = useState(false);
  const [showBreakpointSumOfError, setShowBreakpointSumOfError] =
    useState(false);

  useEffect(() => {
    if (financialProfessionalFeeType !== "Tier") {
      return;
    }
    // Check if there's at least one tier with a value
    const hasAtLeastOneTierWithValue = tiers.some(
      (tier) => tier.tier.replace(/^\$/, "").trim() !== ""
    );

    // Calculate the sum of tier values
    const sumOfTiers = tiers.reduce((sum, tier) => {
      // Convert tier value from string "$10000" to number and add to sum
      const value = parseFloat(tier.tier.replace(/^\$/, "")); // Remove leading '$' and parse
      return sum + (isNaN(value) ? 0 : value); // Add to sum, treating NaN as 0
    }, 0);

    // Convert accountValue to number
    const numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );

    // Check if the sum of tiers equals accountValue and there's at least one tier with value
    setShowTierSumOfError(
      hasAtLeastOneTierWithValue && numericAccountValue !== sumOfTiers
    );
  }, [tiers, accountValue, financialProfessionalFeeType]);

  useEffect(() => {
    if (financialProfessionalFeeType !== "Breakpoint") {
      return;
    }
    const hasAtLeastOneBreakpointWithValue = breakPoints.some(
      (breakpoint) => breakpoint.breakpoint.replace(/^\$/, "").trim() !== ""
    );
    const sumOfBreakpoints = breakPoints.reduce((sum, breakpoint) => {
      // Convert tier value from string "$10000" to number and add to sum
      const value = parseFloat(breakpoint.breakpoint.replace(/^\$/, "")); // Remove leading '$' and parse
      return sum + (isNaN(value) ? 0 : value); // Add to sum, treating NaN as 0
    }, 0);

    const numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );

    setShowBreakpointSumOfError(
      hasAtLeastOneBreakpointWithValue &&
        numericAccountValue !== sumOfBreakpoints
    );
    //setRows(updatedRows);
  }, [breakPoints, accountValue, financialProfessionalFeeType]);

  useEffect(() => {
    // console.log("use effect called");
    const financialProfessionalFee = rows.find(
      (row) => row.name === "Financial Professional Fee"
    );
    let showErrorMessage = false;
    if (financialProfessionalFee.percentage) {
      const percentageValue = financialProfessionalFee.percentage;
      showErrorMessage = parseFloat(percentageValue) > 3;
      setShowErrorMessage(showErrorMessage);
    }
  }, [rows]);

  const radioItems = [
    { label: "Flat", value: "Flat" },
    { label: "Fixed", value: "Fixed" },
    { label: "Tier", value: "Tier" },
    { label: "Breakpoint", value: "Breakpoint" },
  ];

  const handleChange = (value) => {
    // console.log(value)
    setFinancialProfessionalFeeType(value); // Update the selected fee type

    // Perform calculation based on the selected fee type
    switch (value) {
      case "Flat":
        // Call the function to calculate for Flat fee type
        onFlatValueChange({ target: { value: flatValue } });
        break;
      case "Fixed":
        // Call the function to calculate for Fixed fee type
        onFixedValueChange({ target: { value: fixedValue } });
        break;
      case "Tier":
        // Call the function to calculate for Tier fee type
        onTierChangeHandler();
        break;
      case "Breakpoint":
        handleBreakPoint();
        break;
      default:
        break;
    }
  };

  const onClickHandler = () => {
    onNavigate("ProgramFee");
  };

  const onBackClickHandler = () => {
    onNavigate("HomePage");
  };

  const flatValueBlur = () => {
    if (flatValue === "%") {
      setFlatValue("");
    } else if (flatValue) {
      // Check if it ends with ".", append "0" if it does
      let newValue = flatValue.endsWith(".") ? flatValue + "0" : flatValue;
      // Then, check if the new value (potentially with "0" added) doesn't end with "%", append "%"
      newValue = newValue.endsWith("%") ? newValue : newValue + "%";
      setFlatValue(newValue);
    }
  };

  const flatDisplayValue =
    flatValue.endsWith("%") && flatValue.length > 1
      ? flatValue
      : flatValue.replace("%", "");

  const handleFocus = (e, type) => {
    const val = e.target.value;
    if (type === "flat") {
      setFlatValue(val.replace("%", ""));
    } else if (type === "fixed") {
      setFixedValue(val.replace("%", ""));
    }
  };

  const onFlatValueChange = (event) => {
    let inputValue = event.target.value.replace(/[^\d.]/g, "");
    if (inputValue.endsWith("%")) {
      inputValue = inputValue.slice(0, -1);
    }

    const newValue = removeExtraPeriods(inputValue);

    setFlatValue(newValue);

    if (inputValue) {
      let percentage = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      let numericAccountValue = parseFloat(
        accountValue.replace(/[^0-9.-]+/g, "")
      );
      // console.log("percentage", isNaN(percentage));
      // console.log("numericAccountValue", isNaN(numericAccountValue));
      let financialProfessionalFeeDollar =
        numericAccountValue * (percentage / 100);
      if (!isNaN(financialProfessionalFeeDollar)) {
        let financialProfessionalFeePercentage = percentage + "%";

        const updatedRows = rows.map((row) => {
          if (row.name === "Financial Professional Fee") {
            return {
              ...row,
              percentage: financialProfessionalFeePercentage,
              value: `$${financialProfessionalFeeDollar.toFixed(2)}`,
            };
          }
          return row;
        });

        setRows(updatedRows);
      } else {
        // Handle the NaN case, perhaps by setting an error message or logging
        console.log(
          "Error in calculation: financialProfessionalFeeDollar is NaN"
        );
      }
    } else {
      const updatedRows = rows.map((row) => {
        if (row.name === "Financial Professional Fee") {
          return {
            ...row,
            percentage: "N/A",
            value: "N/A",
          };
        }
        return row;
      });

      setRows(updatedRows);
    }
  };

  const onFixedValueChange = (event) => {
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    // console.log("input value ", inputValue);

    if (inputValue) {
      inputValue = "$" + inputValue;
    }
    // console.log("input value with $", inputValue);
    setFixedValue(inputValue);
    let dollarValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    let numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );
    let financialProfessionalFeeDollar = dollarValue;
    if (!isNaN(financialProfessionalFeeDollar)) {
      let financialProfessionalFeePercentage =
        (dollarValue / numericAccountValue) * 100;
      const updatedRows = rows.map((row) => {
        if (row.name === "Financial Professional Fee") {
          return {
            ...row,
            percentage: financialProfessionalFeePercentage + "%",
            value: `$${financialProfessionalFeeDollar.toFixed(2)}`,
          };
        }
        return row;
      });

      setRows(updatedRows);
    }
  };

  const onFixedBlur = () => {
    if (fixedValue === "$") {
      setFixedValue("");
    }
  };

  const fixedDisplayValue =
    fixedValue.startsWith("$") && fixedValue.length > 1
      ? fixedValue
      : fixedValue.replace("$", "");

  const onTierChangeHandler = () => {
    const tierArray = tiers.map((obj) => {
      if (!obj.tier || obj.tier === "") {
        return 0;
      }
      return parseFloat(obj.tier.slice(1));
    });
    while (tierArray.length < 9) {
      tierArray.push(0);
    }

    const feeArray = tiers.map((obj) => {
      if (!obj.fee || obj.fee === "") {
        return 0;
      }
      return parseFloat(obj.fee.slice(0, -1)) / 100;
    });

    while (feeArray.length < 9) {
      feeArray.push(0);
    }
    // console.log("tiers", tiers);
    // console.log("tierArray", tierArray);
    // console.log("feeArray", feeArray);

    // Ensure accountValue is a number and replace any non-numeric characters
    let numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );

    // Ensure numericAccountValue is not NaN; if it is, set it to 0 or another default value
    if (isNaN(numericAccountValue)) {
      // console.log("numericAccountValue is NaN, setting to default value of 0");
      numericAccountValue = 0;
    }

    let { totalTierFee } = calculateTierFee(
      tierArray,
      feeArray,
      numericAccountValue,
      parseFloat(0)
    );

    // Ensure totalTierFee is not NaN
    if (isNaN(totalTierFee)) {
      // console.log("totalTierFee resulted in NaN");
      totalTierFee = 0; // Set to default or handle as needed
    }
    const updatedRows = rows.map((row) => {
      if (row.name === "Financial Professional Fee") {
        return {
          ...row,
          // Assuming percentage calculation is handled elsewhere or differently
          percentage: (totalTierFee / numericAccountValue) * 100 + "%",
          value: `$${totalTierFee.toFixed(2)}`,
        };
      }
      return row;
    });

    setRows(updatedRows);
  };

  function calculateTierFee(ranges, fees, accountValue, householdAUM) {
    let proportion =
      householdAUM > 0
        ? accountValue / Math.max(accountValue, householdAUM)
        : 1;
    let valuesInTier = new Array(ranges.length).fill(0);
    let feesDollars = new Array(fees.length).fill(0);
    let remainingAccountValue = accountValue;

    for (let i = 0; i < ranges.length; i++) {
      if (ranges[i] > 0) {
        let valueInThisTier = 0;
        if (i < ranges.length - 1 && ranges[i + 1] > 0) {
          // Allocate normally for tiers that are not the last non-zero tier
          valueInThisTier = Math.min(
            remainingAccountValue,
            ranges[i] * proportion
          );
        } else {
          // For the last non-zero tier, allocate all remaining account value
          valueInThisTier = remainingAccountValue;
        }
        remainingAccountValue -= valueInThisTier;
        valuesInTier[i] = valueInThisTier;
      }
      feesDollars[i] = valuesInTier[i] * fees[i];
    }

    let totalTierFee = feesDollars.reduce((acc, curr) => acc + curr, 0);
    return { valuesInTier, feesDollars, totalTierFee };
  }

  const handleBreakPoint = () => {
    const breakpointArray = breakPoints.map((obj) => {
      if (!obj.breakpoint || obj.breakpoint === "") {
        return 0;
      }
      return parseFloat(obj.breakpoint.slice(1));
    });
    const feeArray = breakPoints.map((obj) => {
      if (!obj.fee || obj.fee === "") {
        return 0;
      }
      return parseFloat(obj.fee.slice(0, -1));
    });

    let numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );

    const feeResults = calculateBreakpointFees(
      numericAccountValue,
      houseAUM,
      breakpointArray,
      feeArray
    );

    const updatedRows = rows.map((row) => {
      if (row.name === "Financial Professional Fee") {
        return {
          ...row,

          percentage: (feeResults[0].fee / numericAccountValue) * 100,
          value: `$${feeResults[0].fee.toFixed(2)}`,
        };
      }
      return row;
    });

    setRows(updatedRows);
  };

  const calculateBreakpointFees = (
    accountValue,
    houseAUM,
    tiers,
    feePercentages
  ) => {
    // console.log("accountValue", accountValue);
    // console.log("tiers", tiers);
    // console.log("feePercentages", feePercentages);

    // Initialize variables for results and cumulative calculations
    let results = tiers.map(() => ({ valueInBreakpoint: 0, fee: 0 }));
    let cumulativeTierValue = 0;
    let tierPlaced = false;

    for (let i = 0; i < tiers.length; i++) {
      // Update the cumulative tier value
      cumulativeTierValue += tiers[i];

      // Only place the account value in a tier if it hasn't been placed yet and
      // the account value is less than or equal to the cumulative tier value
      if (!tierPlaced && accountValue <= cumulativeTierValue) {
        results[i].valueInBreakpoint = accountValue; // Place the entire account value in this tier
        results[i].fee = accountValue * (feePercentages[i] / 100); // Calculate the fee based on this tier's percentage
        tierPlaced = true; // Mark as placed to prevent allocation to subsequent tiers
      }
    }

    // If account value exceeds all tier ranges, place it in the last tier
    if (!tierPlaced) {
      let lastTierIndex = tiers.length - 1;
      results[lastTierIndex].valueInBreakpoint = accountValue;
      results[lastTierIndex].fee =
        accountValue * (feePercentages[lastTierIndex] / 100);
    }

    return results.filter(
      (result) => result.valueInBreakpoint > 0 || result.fee > 0
    );
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.Container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.navigator}>
            <div>
              <Button
                text="Back"
                onClick={onBackClickHandler}
                background="grey"
              ></Button>
            </div>
            <div>
              <Button
                text="Next"
                onClick={onClickHandler}
                background="grey"
              ></Button>
            </div>
            <div>
              <Button text="Reset" background="grey"></Button>
            </div>
          </div>
          {showErrorMessage && (
            <p className={Styles.errorMessage}>
              The total account fee has exceeded the maximum limit of 3%. Please
              correct the input entries to continue.
            </p>
          )}
          {((financialProfessionalFeeType === "Tier" && showTierSumOfError) ||
            (financialProfessionalFeeType === "Breakpoint" &&
              showBreakpointSumOfError)) && (
            <p className={Styles.errorMessage}>
              The account or household value has exceeded the range of the
              tiered/breakpoint FP Fee schedule entered. Please update the
              tiered/breakpoint schedule to continue.
            </p>
          )}
          <div className={Styles.fpfeeSelectorContainer}>
            <div className={Styles.fpFeeRadioTitleContainer}>
              <div className={Styles.fpFeeTitleAndHint}>
                <h1 className={Styles.title}>Financial Professional Fee</h1>
                <ToolTip text="Maximum Financial Professional Fee for Advisor-directed and Team-directed is 2.25%; CAAP and UMA is 2.15%.">
                  <span className={Styles.hint}>?</span>
                </ToolTip>
              </div>
              <Radio
                items={radioItems}
                value={financialProfessionalFeeType}
                onChange={handleChange}
              ></Radio>
            </div>
          </div>
          {financialProfessionalFeeType === "Flat" && (
            <Flat
              onFocus={(e) => {
                handleFocus(e, "flat");
              }}
              onFlatValueChange={onFlatValueChange}
              flatValue={flatDisplayValue}
              flatValueBlur={flatValueBlur}
            ></Flat>
          )}
          {financialProfessionalFeeType === "Fixed" && (
            <Fixed
              onFixedValueChange={onFixedValueChange}
              fixedValue={fixedDisplayValue}
              onFixedBlur={onFixedBlur}
            ></Fixed>
          )}
          {financialProfessionalFeeType === "Tier" && (
            <Tier
              handleCalculation={onTierChangeHandler}
              onFocus={(e) => {
                handleFocus(e, "tier");
              }}
            ></Tier>
          )}
          {financialProfessionalFeeType === "Breakpoint" && (
            <Breakpoint handleBreakPoint={handleBreakPoint}></Breakpoint>
          )}
        </div>
        <div className={Styles.rightContainer}>
          <h2 className={Styles.rightTitle}>Estimated Results</h2>
          <TabComponent></TabComponent>
        </div>
      </div>
      <div className={Styles.nextBtnContainer}>
        <Button text="Next →" onClick={onClickHandler}></Button>
      </div>
    </div>
  );
};
export default Fpfee;
