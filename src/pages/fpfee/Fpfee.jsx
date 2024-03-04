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
const Fpfee = () => {
  const radioItems = [
    { label: "Flat", value: "Flat" },
    { label: "Fixed", value: "Fixed" },
    { label: "Tier", value: "Tier" },
    { label: "Breakpoint", value: "Breakpoint" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const onClickHandler = () => {
    navigate("/programfee");
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
              <div className={Styles.fpFeeTitleAndHint}>
                <h1 className={Styles.title}>Financial Professional Fee</h1>
                <span className={Styles.hint}>?</span>
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
