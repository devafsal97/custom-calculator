import React, { useState } from "react";
import TextField from "../../../components/textfield/TextField"; // Assuming this is a custom component
import Styles from "./tier.module.css";

const Tier = () => {
  const [tiers, setTiers] = useState([{ tier: "", fee: "" }]);

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
      numericValue = `${numericValue.replace(/%/g, "")}%`; // Removes all % then adds one at the end
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
            <label>{index === 0 ? "First Tier" : "Next Tier"}</label>
            <TextField
              value={tier.tier}
              onChange={(e) => handleInputChange(index, "tier", e.target.value)}
            />
          </div>
          <div className={Styles.fee}>
            <label>% Fee</label>
            <TextField
              value={tier.fee}
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

export default Tier;
