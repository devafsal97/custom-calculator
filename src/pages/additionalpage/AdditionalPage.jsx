import React, { useState } from "react";
import Button from "../../components/button/Button";
import TabComponent from "../../components/tab/Tab";
import TextField from "../../components/textfield/TextField";
import Styles from "./additionalpage.module.css";
import { useNavigate } from "react-router-dom";

const AdditionalPage = () => {
  const [fundExpenses, setFundExpenses] = useState("");
  const [financialPayout, setFinancialPayout] = useState("");
  const [auaDiscount, setAuaDiscount] = useState("");

  const handleChange = (setter) => (event) => {
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    if (inputValue) {
      inputValue += "%";
    }
    setter(inputValue);
  };

  const navigate = useNavigate();

  const handleBlur = (setter, value) => () => {
    if (value === "%") {
      setter("");
    }
  };

  const displayValue = (value) =>
    value.endsWith("%") && value.length > 1 ? value : value.replace("%", "");

  const onClickHandler = () => {
    navigate("/resultpage");
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.Container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.navigator}>
            <div>
              <Button text="Back"></Button>
            </div>
            <div>
              <Button text="Reset"></Button>
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
                <span className={Styles.hint}>?</span>
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
                <span className={Styles.hint}>?</span>
              </div>
              <p className={Styles.adp}>Optional</p>
              <TextField
                type="text"
                onChange={handleChange(setFinancialPayout)}
                onBlur={handleBlur(setFinancialPayout, financialPayout)}
                value={displayValue(financialPayout)}
              />
            </div>
            <div className={Styles.adFundContainer}>
              <div className={Styles.adTitleHintContainer}>
                <h2 className={Styles.adh2}>WealthPort AUA Discount</h2>
                <span className={Styles.hint}>?</span>
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
