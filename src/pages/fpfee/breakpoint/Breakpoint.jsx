import { useState } from "react";
import Styles from "./breakpoint.module.css";
import TextField from "../../../components/textfield/TextField";

const Breakpoint = () => {
  const [breakPoints, setBreakPoints] = useState([{ breakpoint: "", fee: "" }]);

  const handleInputChange = (index, type, value) => {
    let numericValue = value.replace(/[^0-9]/g, "");
    let newBreakpoints = [...breakPoints];

    if (type === "breakpoint") {
      // Handle tier input changes, prepend $ if not present
      if (numericValue && !numericValue.startsWith("$")) {
        numericValue = `$${numericValue}`;
      }
    } else if (type === "fee") {
      // Ensure any entered % signs are removed and only append one at the end
      numericValue = `${numericValue.replace(/%/g, "")}%`; // Removes all % then adds one at the end
    }

    newBreakpoints[index][type] = numericValue;
    setBreakPoints(newBreakpoints);

    // Existing logic for removing tiers or adding new tier fields
    if (type === "fee" && numericValue === "%") {
      if (index !== breakPoints.length - 1) {
        newBreakpoints = newBreakpoints.filter((_, idx) => idx !== index);
        setBreakPoints(newBreakpoints);
      } else {
        // If it's the last tier and fee is only "%", remove the "%"
        newBreakpoints[index][type] = "";
        setBreakPoints(newBreakpoints);
      }
    }

    if (
      type === "fee" &&
      index === breakPoints.length - 1 &&
      numericValue !== "%" &&
      breakPoints.length < 9
    ) {
      setBreakPoints([...newBreakpoints, { breakpoint: "", fee: "" }]);
    }
  };

  return (
    <div>
      <h2>Breakpoint</h2>
      <p>
        A fee rate based on applying the % Fee of the respective breakpoint
        range that the account value falls into to the account value.
      </p>
      {breakPoints.map((breakpoint, index) => (
        <div key={index} className={Styles.breakpointValueContainer}>
          <div className={Styles.breakpoint}>
            <label>
              {index === 0 ? "First Breakpoint" : "Next Breakpoint"}
            </label>
            <TextField
              value={breakpoint.breakpoint}
              onChange={(e) =>
                handleInputChange(index, "breakpoint", e.target.value)
              }
            />
          </div>
          <div className={Styles.fee}>
            <label>% Fee</label>
            <TextField
              value={breakpoint.fee}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "fee",
                  e.target.value.replace(/%/g, "")
                )
              }
              // No need for onKeyDown, onFocus, or onClick handlers here as the logic is simplified
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Breakpoint;
