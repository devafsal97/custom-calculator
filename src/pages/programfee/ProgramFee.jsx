import Button from "../../components/button/Button";
import Styles from "./programfee.module.css";
import TabComponent from "../../components/tab/Tab";
import Radio from "../../components/radiobutton/Radio";
import BasicTable from "../../components/table/table";
import { useState, useEffect } from "react";
import CustomSelect from "../../components/select/Select";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProgramFee = ({ onNavigate }) => {
  const {
    fpFee,
    setFpFee,
    accountValue,
    houseAUM,
    rows,
    setRows,
    feePaidBy,
    setFeePaidBy,
    auaDiscount,
  } = useAppContext();

  const [inputError, setInputError] = useState(false);

  const onSelectHandler = (event) => {
    setFeePaidBy(event.target.value);
    setInputError(false);
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
    setFpFee(value);
  };
  const updateTiers = (auaDiscount, baseTiers) => {
    const auaDecimal = auaDiscount / 100;
    return baseTiers.map((tier) =>
      tier.map((value) =>
        auaDiscount === 0 ? value : (1 - auaDecimal) * value
      )
    );
  };

  const calculateProgramFee = (
    acctValue,
    houseAUM,
    programType,
    auaDiscount
  ) => {
    const baseTiers = [
      [0.0025, 0.0025, 0.004, 0.005, 0.0045],
      [0.0023, 0.0023, 0.0036, 0.005, 0.0042],
      [0.002, 0.002, 0.0032, 0.005, 0.0038],
      [0.0017, 0.0017, 0.0027, 0.005, 0.0035],
      [0.0014, 0.0014, 0.0021, 0.005, 0.0027],
      [0.0009, 0.0009, 0.0015, 0.005, 0.002],
      [0.0006, 0.0006, 0.0012, 0.005, 0.0015],
      [0.0003, 0.0003, 0.0008, 0.005, 0.001],
      [0.0001, 0.0001, 0.0005, 0.005, 0.0007],
    ];
    const updatedTiers = updateTiers(auaDiscount, baseTiers);
    console.log(updatedTiers);

    let programCol;
    switch (programType) {
      case "Advisor-directed":
        programCol = 0;
        break;
      case "Team-directed":
        programCol = 1;
        break;
      case "CAAP":
        programCol = 2;
        break;
      case "CAAP Small Account Solutions":
        programCol = 3;
        break;
      case "UMA/SMA":
        programCol = 4;
        break;
      default:
        throw new Error("Invalid Program Type");
    }

    const tierValues = [
      50000, 50000, 150000, 250000, 500000, 1000000, 3000000, 5000000, 10000000,
    ];
    let tierData = tierValues.map((value, index) => ({
      tierValue: value,
      pct: updatedTiers[index][programCol],
    }));

    let maxAUM = Math.max(acctValue, houseAUM);
    let pctOfHouseAUM = acctValue / maxAUM;
    let unUsedAcctValue = acctValue;
    let result = new Array(9).fill(0);

    for (let i = 0; i < tierValues.length; i++) {
      let tierAccum = tierValues
        .slice(0, i + 1)
        .reduce((acc, curr) => acc + curr, 0);
      if (maxAUM > tierAccum && i < 8) {
        let appliedValue =
          Math.round(pctOfHouseAUM * tierData[i].tierValue * 100) / 100;
        unUsedAcctValue -= appliedValue;
        result[i] = Math.round(tierData[i].pct * appliedValue * 100) / 100;
      } else {
        result[i] = Math.round(tierData[i].pct * unUsedAcctValue * 100) / 100;
        break;
      }
    }
    return result;
  };

  useEffect(() => {
    console.log("Changeled");
    const numericAccountValue = parseFloat(
      accountValue.replace(/[^0-9.-]+/g, "")
    );

    const programFeeArray = calculateProgramFee(
      numericAccountValue,
      houseAUM,
      fpFee,
      auaDiscount
    );
    const totalProgramFee = programFeeArray.reduce(
      (acc, curr) => acc + curr,
      0
    );
    const programFeePercentage = (totalProgramFee / numericAccountValue) * 100;
    const updatedRows = rows.map((row) => {
      if (row.name === "Program Fee") {
        return {
          ...row,
          percentage: `${programFeePercentage.toFixed(2)}%`,
          value: `$${totalProgramFee.toFixed(2)}`,
        };
      }
      return row;
    });

    setRows(updatedRows);
  }, [accountValue, houseAUM, fpFee, auaDiscount]);

  useEffect(() => {
    console.log("Effect run:", { accountValue, houseAUM, fpFee, auaDiscount });
    // Rest of your effect logic...
  }, [accountValue, houseAUM, fpFee, auaDiscount]);

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
    if (!feePaidBy) {
      setInputError(true); // Set error state if accountValue is empty
      return; // Prevent navigation
    }
    onNavigate("StrategistFee");
  };

  const onBackClickHandler = () => {
    onNavigate("FpFee");
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
          <div className={Styles.fpfeeSelectorContainer}>
            <div className={Styles.fpFeeRadioTitleContainer}>
              <div className={Styles.fpFeeTitleAndDescription}>
                <h1 className={Styles.title}>Program Fee</h1>
                <p style={{ margin: "0px" }}>
                  The WealthPort Program Fee covers operating and administrative
                  costs associated with WealthPort, including clearing, custody,
                  trading and some common ancillary fees.
                </p>
                <div className={Styles.flContainer}>
                  <button className={Styles.featureListButton}>
                    Full List of Features
                  </button>
                </div>
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
            <h3
              className={`${Styles.selectTitle} ${
                inputError ? Styles.errorColor : ""
              } `}
            >
              Program Fee Payment*
            </h3>
            <p
              className={`${Styles.selectlabel} ${
                inputError ? Styles.errorColor : ""
              } `}
            >
              Select who pays program fee
            </p>
            <div className={Styles.selectContainer}>
              <CustomSelect
                label="Age"
                options={[
                  { label: "Paid by FP", value: "Paid by FP" },
                  { label: "Paid by Client", value: "Paid by Client" },
                ]}
                onChange={onSelectHandler}
                value={feePaidBy}
              ></CustomSelect>

              {inputError && (
                <p className={Styles.errorMessage}>Please make a selection</p>
              )}
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
