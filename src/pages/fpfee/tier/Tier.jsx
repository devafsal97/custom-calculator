import React, { useState } from "react";
import TextField from "../../../components/textfield/TextField"; // Assuming this is a custom component
import Styles from "./tier.module.css";
import { useAppContext } from "../../../context/AppContext";
const Tier = ({ handleCalculation, onFocus }) => {
  const { tiers, setTiers } = useAppContext();

  const handleInputChange = (index, type, value) => {
    let numericValue = value.replace(/[^0-9]/g, "");
    let newTiers = [...tiers];

    if (type === "tier") {
      // Handle tier input changes, prepend $ if not present
      if (numericValue && !numericValue.startsWith("$")) {
        numericValue = `$${numericValue}`;
      }
    } else if (type === "fee") {
      // Ensure any entered % signs are removed and only append one at the end
      numericValue = numericValue; //`${numericValue.replace(/%/g, "")}%`; // Removes all % then adds one at the end
    }

    newTiers[index][type] = numericValue;
    setTiers(newTiers);

    // Existing logic for removing tiers or adding new tier fields
    if (type === "fee" && numericValue === "%") {
      if (index !== tiers.length - 1) {
        newTiers = newTiers.filter((_, idx) => idx !== index);
        setTiers(newTiers);
      } else {
        // If it's the last tier and fee is only "%", remove the "%"
        newTiers[index][type] = "";
        setTiers(newTiers);
      }
    }

    if (
      type === "fee" &&
      index === tiers.length - 1 &&
      numericValue !== "%" &&
      tiers.length < 9
    ) {
      setTiers([...newTiers, { tier: "", fee: "" }]);
    }
    if (type === "fee") {
      handleCalculation();
    }
  };
  const handleFocus = (e, index, type) => {
    const valueWithoutPercent = e.target.value.replace("%", ""); // Remove "%" if present
    // Update the specific tier object at the given index
    setTiers(
      tiers.map((tier, i) =>
        i === index ? { ...tier, [type]: valueWithoutPercent } : tier
      )
    );
  };

  const handleBlur = (e, index, type) => {
    const valueWithPercent =
      e.target.value && !e.target.value.endsWith("%")
        ? e.target.value + "%"
        : e.target.value; // Append "%" if necessary
    // Update the specific tier object at the given index
    setTiers(
      tiers.map((tier, i) =>
        i === index ? { ...tier, [type]: valueWithPercent } : tier
      )
    );
  };

  return (
    <div>
      <h2>Build Tier Table</h2>
      <p>
        A blended rate fee based on applying the % Fee to the value of the
        account that falls into each respective fee tier.
      </p>
      {tiers.map((tier, index) => (
        <div key={index} className={Styles.tierValueContainer}>
          <div className={Styles.tier}>
            <label className={Styles.label}>
              {index === 0 ? "First Tier" : "Next Tier"}
            </label>
            <TextField
              value={tier.tier}
              onChange={(e) => handleInputChange(index, "tier", e.target.value)}
            />
          </div>
          <div className={Styles.fee}>
            <label className={Styles.label}>% Fee</label>
            <TextField
              value={tier.fee}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "fee",
                  e.target.value.replace(/%/g, "")
                )
              }
              onFocus={(e) => handleFocus(e, index, "fee")}
              onBlur={(e) => handleBlur(e, index, "fee")}
              // No need for onKeyDown, onFocus, or onClick handlers here as the logic is simplified
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tier;
