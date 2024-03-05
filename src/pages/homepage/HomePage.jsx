import React from "react";
import Styles from "./homepage.module.css";
import TextField from "../../components/textfield/TextField";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const HomePage = ({ onNavigate }) => {
  const { accountValue, setAccountValue } = useAppContext(); // Use context here

  const handleChange = (event) => {
    let numericValue = event.target.value.replace(/[^0-9]/g, "");
    if (numericValue) {
      const formattedValue = numberWithCommas(numericValue);
      setAccountValue("$ " + formattedValue); // Update using context
    } else {
      setAccountValue(""); // Update using context
    }
  };

  const onClickHandler = () => {
    onNavigate("FpFee");
  };

  const numberWithCommas = (x) => {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.titleContainer}>
            <h1 className={Styles.title}>
              Welcome to the WealthPort® Calculator!
            </h1>
          </div>
          <div className={Styles.descriptionContainer}>
            <p className={Styles.description}>
              Use this tool to calculate the estimated account fees for any
              WealthPort program fee type or to compare investment options.
            </p>
          </div>
          <div className={Styles.instructionContainer}>
            <button className={Styles.instructionButton}>
              Access the Original WealthPort Calculator in Excel Spreadsheet
            </button>
          </div>
        </div>
        <div className={Styles.rightContainer}>
          <div className={Styles.leftContainerContent}>
            <div className={Styles.labelContainer}>
              <h3 className={Styles.inputLabe}>Enter Account Value*</h3>
            </div>
            <div>
              <TextField
                type="text"
                onChange={handleChange}
                value={accountValue}
              ></TextField>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.buttonSection}>
        <div className={Styles.btnContainer}>
          <Button text="Next →" onClick={onClickHandler}></Button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
