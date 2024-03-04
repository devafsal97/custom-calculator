import React from "react";
import Styles from "./homepage.module.css";
import TextField from "../../components/textfield/TextField";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    let numericValue = event.target.value.replace(/[^0-9]/g, "");
    if (numericValue) {
      const formattedValue = numberWithCommas(numericValue);
      setValue("$ " + formattedValue);
    } else {
      setValue("");
    }
  };

  const onClickHandler = () => {
    navigate("/fpfee");
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
                value={value}
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
