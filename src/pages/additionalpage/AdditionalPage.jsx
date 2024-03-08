import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import TabComponent from "../../components/tab/Tab";
import TextField from "../../components/textfield/TextField";
import Styles from "./additionalpage.module.css";
import { useNavigate } from "react-router-dom";
import ToolTip from "../../components/tooltip/ToolTip";
import { useAppContext } from "../../context/AppContext";
import CustomSelect from "../../components/select/Select";

const AdditionalPage = ({ onNavigate }) => {
  const [financialPayout, setFinancialPayout] = useState("");
  const { financialProfessionalFeeType } = useAppContext();
  const {
    fpFee,
    setFpFee,
    auaDiscount,
    setAuaDiscount,
    rows,
    setAdditionalDetailsRows,
    fundExpenses,
    setFundExpenses,
  } = useAppContext();

  useEffect(() => {
    console.log("useEffect called", financialPayout);
    // This effect runs when financialPayout changes
    if (financialPayout) {
      // Find the "Financial Professional Fee" row to get its percentage and value
      const financialProfessionalFeeRow = rows.find(
        (row) => row.name === "Financial Professional Fee"
      );

      // Ensure the row exists before attempting to update
      if (financialProfessionalFeeRow) {
        // Update "Gross Annual Fee to Financial Professional" in additionalDetailsRows
        setAdditionalDetailsRows((prevDetailsRows) => {
          return prevDetailsRows.map((detailRow) => {
            if (
              detailRow.name === "Gross Annual Fee to Financial Professional"
            ) {
              return {
                ...detailRow,
                percentage: financialProfessionalFeeRow.percentage,
                value: financialProfessionalFeeRow.value,
              };
            }
            return detailRow;
          });
        });
      }
    }
  }, [financialPayout, rows, setAdditionalDetailsRows]);

  const handleChange = (setter) => (event) => {
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    if (inputValue) {
      inputValue += "%";
    }
    setter(inputValue);
    if (setter === setFinancialPayout) {
    }
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
  const onSelectHandler = (event) => {
    const newValue = event.target.value;
    setAuaDiscount((prevAuaDiscount) => newValue);
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
              {/* <TextField
                type="text"
                onChange={handleChange(setAuaDiscount)}
                onBlur={handleBlur(setAuaDiscount, auaDiscount)}
                value={displayValue(auaDiscount)}
              /> */}
              <div className={Styles.selectContainer}>
                <CustomSelect
                  options={[
                    { label: "0%", value: "0" },
                    { label: "10%", value: "10" },
                    { label: "15%", value: "15" },
                    { label: "20%", value: "20" },
                    { label: "25%", value: "25" },
                  ]}
                  onChange={onSelectHandler}
                  value={auaDiscount}
                ></CustomSelect>
              </div>
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
