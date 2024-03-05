import Styles from "./fpfee.module.css";
import Button from "../../components/button/Button";
import Radio from "../../components/radiobutton/Radio";
import { useState } from "react";
import Flat from "./flat/Flat";
import Fixed from "./fixed/Fixed";
import Tier from "./tier/Tier";
import Breakpoint from "./breakpoint/Breakpoint";
import TabComponent from "../../components/tab/Tab";
import { useNavigate } from "react-router-dom";
import ToolTip from "../../components/tooltip/ToolTip";
const Fpfee = ({ onNavigate }) => {
  const radioItems = [
    { label: "Flat", value: "Flat" },
    { label: "Fixed", value: "Fixed" },
    { label: "Tier", value: "Tier" },
    { label: "Breakpoint", value: "Breakpoint" },
  ];
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const onClickHandler = () => {
    onNavigate("ProgramFee");
  };

  const onBackClickHandler = () => {
    onNavigate("HomePage");
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
                value={selectedValue}
                onChange={handleChange}
              ></Radio>
            </div>
          </div>
          {selectedValue === "Flat" && <Flat></Flat>}
          {selectedValue === "Fixed" && <Fixed></Fixed>}
          {selectedValue === "Tier" && <Tier></Tier>}
          {selectedValue === "Breakpoint" && <Breakpoint></Breakpoint>}
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
