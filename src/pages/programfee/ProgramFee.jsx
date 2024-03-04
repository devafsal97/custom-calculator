import Button from "../../components/button/Button";
import Styles from "./programfee.module.css";
import TabComponent from "../../components/tab/Tab";
import Radio from "../../components/radiobutton/Radio";
import BasicTable from "../../components/table/table";
import { useState } from "react";
import CustomSelect from "../../components/select/Select";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProgramFee = () => {
  const [selectedValue, setSelectedValue] = useState("Advisor-directed");
  const [feePaidBy, setFeePaidBy] = useState("");
  const { fpFee, setFpFee } = useAppContext();
  const navigate = useNavigate();

  const onSelectHandler = (event) => {
    console.log("value", event.target.value);
    setFeePaidBy(event.target.value);
  };

  const radioItems = [
    { label: "Advisor-directed", value: "Advisor-directed" },
    { label: "Team-directed", value: "Team-directed" },
    { label: "CAAP", value: "CAAP" },
    {
      label: "CAAP Small Account Solutions",
      value: "CAAP Small Account Solutions",
    },
    {
      label: "UMA/SMA",
      value: "UMA/SMA",
    },
  ];

  const handleChange = (value) => {
    setSelectedValue(value);
    setFpFee(value);
  };

  const descriptionContent = {
    "Advisor-directed":
      "The Financial Professional serves as the Portfolio Manager.",
    "Team-directed":
      "The Financial Professional partners with their enterprise to utilize shared models.",
    CAAP: "Strategist-directed solution providing access to world-class money managers for accounts over $50,000.",
    "CAAP Small Account Solutions":
      "Strategist-directed solution providing access to world-class money managers for accounts starting at $5,000.",
    "UMA/SMA":
      "Blend multiple investment strategies, including CAAP mutual fund, ETF, and Equity SMAs, into one account starting at $100,000.",
  };

  const onClickHandler = () => {
    navigate("/strategistfee");
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
          <div className={Styles.fpfeeSelectorContainer}>
            <div className={Styles.fpFeeRadioTitleContainer}>
              <div className={Styles.fpFeeTitleAndDescription}>
                <h1 className={Styles.title}>Program Fee</h1>
                <p>
                  The WealthPort Program Fee covers operating and administrative
                  costs associated with WealthPort, including clearing, custody,
                  trading and some common ancillary fees.
                </p>
              </div>
              <div className={Styles.radioContainer}>
                <Radio
                  items={radioItems}
                  value={fpFee}
                  onChange={handleChange}
                ></Radio>
                <div className={Styles.descriptionBox}>
                  {descriptionContent[fpFee]}
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.feePayContainer}>
            <h3 style={{ margin: "0px" }}>Program Fee Payment*</h3>
            <p style={{ margin: "0px" }}>Select who pays program fee</p>
            <div className={Styles.selectContainer}>
              <CustomSelect
                label="Age"
                options={[
                  { label: "Paid by Fp", value: "Paid by Fp" },
                  { label: "Paid by Client", value: "Paid by Client" },
                ]}
                onChange={onSelectHandler}
                value={feePaidBy}
              ></CustomSelect>
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
export default ProgramFee;
