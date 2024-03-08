import Button from "../../components/button/Button";
import TabComponent from "../../components/tab/Tab";
import Styles from "./umasma.module.css";
import { useAppContext } from "../../context/AppContext";
import TextField from "../../components/textfield/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UmaSmaAllocations = ({ onNavigate }) => {
  const {
    selectedMFEFTItems,
    setSelectedMFEFTItems,
    selectedEquitySMAItems,
    setSelectedEquitySMAItems,
    accountValue,
    rows,
    setRows,
  } = useAppContext();

  const [overallStatus, setOverallStatus] = useState("Under Allocated");

  const numericAccountValue = parseFloat(
    accountValue.replace(/[^0-9.-]+/g, "")
  );

  const umasmaAllocationArray = selectedMFEFTItems.concat(
    selectedEquitySMAItems
  );

  const [allocations, setAllocations] = useState({});

  // Function to handle input changes and perform the calculation
  const handleAllocationChange = (item, inputValue) => {
    console.log("item", item);
    const numericValue = parseFloat(inputValue.replace("%", "")) || 0; // Ensure fallback to 0 if NaN

    // Perform your calculation with the numeric value
    const calculatedValue = (numericValue * numericAccountValue) / 100;

    // Prepare the display value to include the "%" sign
    const displayValue = `${numericValue}%`;

    // Update the state with the numeric value and the calculated status
    const allocationStatus =
      calculatedValue < item.allocationValue
        ? "Under Allocated"
        : `$${calculatedValue.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}`;

    // Construct the updated allocations object to reflect the change
    const updatedAllocations = {
      ...allocations,
      [item.name]: {
        value: numericValue,
        displayValue: displayValue,
        status: allocationStatus,
        bpsValue: item.value,
      },
    };

    // Now, use updatedAllocations to calculate the totalInputValue
    const totalInputValue = Object.values(updatedAllocations).reduce(
      (total, alloc) => total + (alloc.value || 0),
      0
    );

    // Update the overall status based on the total
    if (totalInputValue < 100) {
      setOverallStatus("Under Allocated");
    } else if (totalInputValue === 100) {
      setOverallStatus("Allocation Completed");
    } else {
      setOverallStatus("Over Allocated");
    }

    console.log("updatedAllocations", updatedAllocations);
    const totalSum = Object.values(updatedAllocations).reduce((sum, item) => {
      return sum + (item.bpsValue * item.value) / 100;
    }, 0);

    const updatedRows = rows.map((row) => {
      if (row.name === "Strategist Fee (if applicable)") {
        return {
          ...row,
          percentage: totalSum.toFixed(2) + "%",
          value: `$${(numericAccountValue * totalSum) / 100}`,
        };
      }
      return row;
    });

    setRows(updatedRows);

    setAllocations(updatedAllocations);
  };

  const onClickHandler = () => {
    onNavigate("AdditionalPage");
  };

  const onBackClickHandler = () => {
    onNavigate("StrategistFee");
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
          <div className={Styles.fpFeeTitleAndHint}>
            <h1 className={Styles.title}>UMA/SMA Allocations</h1>
          </div>
          <div>
            <div className={Styles.statusContainer}>
              <p className={Styles.statusText}>Status:</p>
              <h4 className={Styles.statusValue}>{overallStatus}</h4>
            </div>
            <div>
              {umasmaAllocationArray.map((item) => {
                const allocation = allocations[item.name] || {};
                return (
                  <div
                    key={item.name}
                    className={Styles.allocationDataContainer}
                  >
                    <div className={Styles.allocTextContainer}>
                      <p className={Styles.allocLabel}>{item.name}</p>
                      <TextField
                        value={allocation.displayValue || ""}
                        onChange={(e) =>
                          handleAllocationChange(item, e.target.value)
                        }
                      />
                    </div>
                    <div className={Styles.allocValueContainer}>
                      <p className={Styles.allocLabel}>Value in $</p>
                      <p
                        className={`${
                          allocation.status === "Under Allocated"
                            ? Styles.alocationText
                            : Styles.alocationValue
                        }`}
                      >
                        {allocation.status || "Under Allocated"}
                      </p>
                    </div>
                  </div>
                );
              })}
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

export default UmaSmaAllocations;
