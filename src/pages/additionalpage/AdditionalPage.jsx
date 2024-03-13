import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import TabComponent from "../../components/tab/Tab";
import TextField from "../../components/textfield/TextField";
import Styles from "./additionalpage.module.css";
import { useNavigate } from "react-router-dom";
import ToolTip from "../../components/tooltip/ToolTip";
import { useAppContext } from "../../context/AppContext";

const AdditionalPage = ({ onNavigate }) => {
  const { rows, setRows } = useAppContext();
  const [fundExpenses, setFundExpenses] = useState("");
  const [financialPayout, setFinancialPayout] = useState("");
  const [auaDiscount, setAuaDiscount] = useState("");
  const { financialProfessionalFeeType } = useAppContext();
  const { fpFee, setFpFee } = useAppContext();
  const [total, setTotal] = useState({ percentage: "", value: "" });

  const handleChange = (setter) => (event) => {
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    if (inputValue) {
      inputValue += "%";
    }
    setter(inputValue);
  };

  const handleBlur = (setter, value) => () => {
    if (value === "%") {
      setter("");
    }
  };

  const displayValue = (value) =>
    value.endsWith("%") && value.length > 1 ? value : value.replace("%", "");

  const onClickHandler = () => {
    onNavigate("ResultPage");
  };
  const onBackClickHandler = () => {
    if (fpFee === "UMA/SMA") {
      onNavigate("UmaSma");
    } else {
      onNavigate("StrategistFee");
    }
  };
  useEffect(() => {
    let percentageValue = 0;
    let calculatedValue = 0;
    const updatedRows = rows.map((row) => {
      if (
        row.name === "Financial Professional Fee" ||
        row.name === "Program Fee" ||
        row.name === "Strategist Fee (if applicable)"
      ) {
        if (row.percentage !== "N/A") {
          const pValue = parseFloat(row.percentage.replace("%", ""));
          percentageValue += pValue;
        }
        if (row.value !== "N/A") {
          const cValue = parseFloat(row.value.replace("$", ""));
          calculatedValue += cValue;
        }
      }
      setTotal((currentTotal) => ({
        ...currentTotal,
        percentage: percentageValue,
      }));
      setTotal((currentTotal) => ({ ...currentTotal, value: calculatedValue }));
      if (row.name === "Total Account Fee (annualized)") {
        row.percentage = percentageValue + "%";
        row.value = "$" + calculatedValue;
      }
      if (row.name === "Total Client Fees (including Fund Expenses)") {
        const fundExp = parseFloat(fundExpenses.replace("%", ""));
        // console.log(
        //   percentageValue,
        //   " percentageValue percentageValue percentageValue "
        // );
        if (fundExpenses === NaN || fundExpenses === "") {
          // console.log("percentageValue", percentageValue, row.percentage);
          row.percentage = percentageValue;
          // console.log("percentageValue", percentageValue, row.percentage);
        }
      }
      return row;
    });
    setRows(updatedRows);
    // console.log(fundExpenses, "fundExpenses");
  }, []);

  useEffect(() => {
    if (fundExpenses !== "") {
    // console.log("exicuted")
      const updatedRows = rows.map((row) => {
        if (row.name === "Total Client Fees (including Fund Expenses)") {
          const fundExp = parseFloat(fundExpenses.replace("%", ""));
          const value = total.percentage + fundExp;
          row.percentage = value + "%";
        }
        return row;
      });
      setRows(updatedRows);
    }
  }, [fundExpenses]);

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
                onClick={onClickHandler}
                text="Next"
                background="grey"
              ></Button>
            </div>
            <div>
              <Button text="Reset" background="grey"></Button>
            </div>
          </div>
          <div className={Styles.adTitleAnddecription}>
            <h1 className={Styles.title}>Additional Detail (Optional)</h1>
            <p style={{ margin: "0px" }}>
              The Strategist Fee covers costs associated with asset allocation
              and model trading services. Applicable to CAAP, UMA, and
              Team-directed.
            </p>
          </div>
          <div>
            <div className={Styles.adFundContainer}>
              <div className={Styles.adTitleHintContainer}>
                <h2 className={Styles.adh2}>Fund Expenses</h2>
                <ToolTip text="Underlying management fees charged by fund managers can be added to this calculation to show impact of fund expenses on total client fee.">
                  <span className={Styles.hint}>?</span>
                </ToolTip>
              </div>
              <p className={Styles.adp}>Optional</p>
              <TextField
                type="text"
                onChange={handleChange(setFundExpenses)}
                onBlur={handleBlur(setFundExpenses, fundExpenses)}
                value={displayValue(fundExpenses)}
              />
            </div>
            <div className={Styles.adFundContainer}>
              <div className={Styles.adTitleHintContainer}>
                <h2 className={Styles.adh2}>Financial Professional Payout</h2>
                <ToolTip text="This can be entered to estimate your net compensation on the illustrated account.">
                  <span className={Styles.hint}>?</span>
                </ToolTip>
              </div>
              <p className={Styles.adp}>Optional</p>
              <TextField
                type="text"
                onChange={handleChange(setFinancialPayout)}
                onBlur={handleBlur(setFinancialPayout, financialPayout)}
                value={displayValue(financialPayout)}
              />
            </div>
            {(financialProfessionalFeeType === "Tier" ||
              financialProfessionalFeeType === "Breakpoint") && (
              <div className={Styles.adFundContainer}>
                <div className={Styles.adTitleHintContainer}>
                  <h2 className={Styles.adh2}>
                    Total WealthPort Household Value
                  </h2>
                  <ToolTip text="Entering a household will allow you to illustrate the value of aggregating multiple accounts for fee calculations.">
                    <span className={Styles.hint}>?</span>
                  </ToolTip>
                </div>
                <p className={Styles.adp}>Optional</p>
                <TextField
                  type="text"
                  onChange={handleChange(setAuaDiscount)}
                  onBlur={handleBlur(setAuaDiscount, auaDiscount)}
                  value={displayValue(auaDiscount)}
                />
              </div>
            )}
            <div className={Styles.adFundContainer}>
              <div className={Styles.adTitleHintContainer}>
                <h2 className={Styles.adh2}>WealthPort AUA Discount</h2>
                <ToolTip text="WealthPort Program Fee discounts may be available to your clients based off the AUM under a Financial Professional code in WealthPort.">
                  <span className={Styles.hint}>?</span>
                </ToolTip>
              </div>
              <p className={Styles.adp}>
                Enter WealthPort AUA Discount Discount (if applicable)
              </p>
              <TextField
                type="text"
                onChange={handleChange(setAuaDiscount)}
                onBlur={handleBlur(setAuaDiscount, auaDiscount)}
                value={displayValue(auaDiscount)}
              />
            </div>
          </div>
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

export default AdditionalPage;
