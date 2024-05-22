import React, { useState, useEffect } from "react";
import CircularProgress from "../CircularProgress/CircularProgress";
// import './FinancialProfessionalFee.css';

const FinancialProfessionalFee = ({
  onComplete,
  handleChange,
  setCalculationData,
  calculationData,
  getCalculationDataValue,
}) => {
  // State for the fee type selection
  const [feeType, setFeeType] = useState("");

  const fetchBreakPoints = () => {
    const tiersData = getCalculationDataValue("FPfeeBreakPoints");
    return Object.keys(tiersData).map((key) => ({
      ...tiersData[key], // Spread the amount and percentage
      id: key, // Keep track of the original key if needed
    }));
  };

  const fetchTiers = () => {
    const tiersData = getCalculationDataValue("FPfeeTiers");
    return Object.keys(tiersData).map((key) => ({
      ...tiersData[key], // Spread the amount and percentage
      id: key, // Keep track of the original key if needed
    }));
  };
  // State hook to store tiers
  const [tiers, setTiers] = useState(fetchTiers());

  const [breakpoints, setBreakpoints] = useState(fetchBreakPoints());
  // Example account value for progress calculations
  const accountValue = 100000;
  const MAX_ITEMS = 9;

  // Handle change of fee type
  const handleFeeChange = (event) => {
    setFeeType(event.target.value);
    handleChange({
      target: { name: "FPfeeType", value: event.target.value },
    });
  };
  // Example function to check if the data is complete
  const isDataComplete = () => {
    // Example logic: just checks if a fee type is selected and at least one value is entered
    return (
      feeType !== "" &&
      ((feeType === "fixed" && tiers[0]?.amount !== "") ||
        (feeType === "breakpoint" && breakpoints[0]?.amount !== ""))
    );
  };

  // Check completion on each change
  useEffect(() => {
    if (isDataComplete() && onComplete) {
      onComplete(); // Invoke the onComplete handler when data is complete
    }
  }, [feeType, tiers, breakpoints, onComplete]);

  // Update tier value
  const updateTier = (index, field, value) => {
    const updatedTiers = [...tiers];
    updatedTiers[index][field] = value;
    setTiers(updatedTiers);
    handleChange({
      target: {
        name: "FPfeeTiers",
        value: updatedTiers.reduce((acc, tier, idx) => {
          acc[`tier${idx + 1}`] = { ...tier };
          return acc;
        }, {}),
      },
    });
  };

  // Update breakpoint value
  const updateBreakpoint = (index, field, value) => {
    const updatedBreakpoints = [...breakpoints];
    updatedBreakpoints[index][field] = value;
    setBreakpoints(updatedBreakpoints);
    handleChange({
      target: {
        name: "FPfeeBreakPoints",
        value: updatedBreakpoints.reduce((acc, bp, idx) => {
          acc[`breakpoint${idx + 1}`] = { ...bp };
          return acc;
        }, {}),
      },
    });
  };

  const handleFixed = (event) => {
    const value = event.target.value;
    handleChange({
      target: {
        name: "FPfeeFixed",
        value: { type: "fixed", amount: value },
      },
    });
  };
  const handleFlat = (event) => {
    const value = event.target.value;
    handleChange({
      target: {
        name: "FPfeeFlat",
        value: { type: "flat", amount: value },
      },
    });
  };

  // Add another tier
  const addTier = () => {
    if (tiers.length < MAX_ITEMS) {
      setTiers([...tiers, { amount: "", percentage: "" }]);
    }
  };

  // Add another breakpoint
  const addBreakpoint = () => {
    if (breakpoints.length < MAX_ITEMS) {
      setBreakpoints([...breakpoints, { amount: "", percentage: "" }]);
    }
  };

  // Calculate the tier progress
  const calculateTierProgress = () => {
    const progress = tiers.reduce((total, tier) => {
      const tierAmount = parseFloat(tier.amount) || 0;
      return total + (tierAmount <= accountValue ? 1 : 0);
    }, 0);
    return (progress / tiers.length) * 100;
  };

  // Calculate the breakpoint progress
  const calculateBreakpointProgress = () => {
    const progress = breakpoints.reduce((total, bp) => {
      const bpAmount = parseFloat(bp.amount) || 0;
      return total + (bpAmount <= accountValue ? 1 : 0);
    }, 0);
    return (progress / breakpoints.length) * 100;
  };

  // Dynamically label tiers and breakpoints
  const getOrdinalLabel = (index) => {
    const ordinals = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
    ];
    return ordinals[index] || `Tier ${index + 1}`;
  };

  // Render the appropriate content based on the fee type
  const renderFeeContent = () => {
    switch (feeType) {
      case "flat":
        return (
          <div>
            <div className="fee-input-title">Enter Flat Fee</div>
            <div className="fee-input-description">
              Enter a flat annual percentage fee based on the total account
              value; billed monthly or quarterly. Maximum Financial Professional
              Fee for Advisor-directed and Team-directed is 2.25%; CAAP and UMA
              is 2.15%.{" "}
            </div>
            <div className="fee-input-label">Enter Flat Fee Amount (%)</div>
            <input
              type="number"
              onChange={handleFlat}
              value={getCalculationDataValue("FPfeeFlat")?.amount || ""}
              placeholder="%"
              className="scenario-input"
            />
          </div>
        );
      case "fixed":
        return (
          <div>
            <div className="fee-input-title">Enter Fixed Fee</div>
            <div className="fee-input-description">
              Enter a fixed annual dollar amount, billed monthly or quarterly.
              Maximum Financial Professional Fee for Advisor-directed and
              Team-directed is 2.25%; CAAP and UMA is 2.15%.
            </div>
            <div className="fee-input-label">Enter Fixed Fee ($)</div>
            <input
              onChange={handleFixed}
              type="number"
              placeholder="$"
              value={getCalculationDataValue("FPfeeFixed")?.amount || ""}
              className="scenario-input"
            />
          </div>
        );
      case "tier":
        return (
          <div>
            <div className="fee-input-title">Build Tier Table</div>
            <div className="progress-fp">
              <div className="fee-input-description">
                A blended rate fee based on applying the % Fee to the value of
                the account that falls into each respective fee tier.
              </div>
              <CircularProgress percentage={0} />
            </div>
            {tiers.map((tier, index) => (
              <div key={index} className="tier-breakpoint-row">
                <div className="tier-breakpoint-input">
                  <div className="tier-label">
                    {getOrdinalLabel(index)} Tier
                  </div>
                  <input
                    type="number"
                    value={tier.amount}
                    placeholder="$"
                    onChange={(e) =>
                      updateTier(index, "amount", e.target.value)
                    }
                    className="scenario-input"
                  />
                </div>
                <div className="percentage-input">
                  <div>% Fee</div>
                  <input
                    type="number"
                    value={tier.percentage}
                    placeholder="%"
                    className="scenario-input"
                    onChange={(e) =>
                      updateTier(index, "percentage", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            {tiers.length != MAX_ITEMS ? (
              <div className="tier-breakpoint-btn-wrapper" onClick={addTier}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc9f7f93b265b7a99dbd7335ed6fe561e3e2642aabe2c1ba8aa6b8203b298043?apiKey=f95b5ca361ef4526b1cb461f7b2405ea&"
                  className="img"
                />
                <div className="tier-breakpoint-btn">
                  Add Another Breakpoint
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      case "breakpoint":
        return (
          <div>
            <div className="fee-input-title">Build Breakpoint Table</div>
            <div className="progress-fp">
              <div className="fee-input-description">
                A blended rate fee based on applying the % Fee to the value of
                the account that falls into each respective fee tier.
              </div>
              <CircularProgress percentage={0} />
            </div>

            {breakpoints.map((bp, index) => (
              <div key={index} className="tier-breakpoint-row">
                <div className="tier-breakpoint-input">
                  <div className="tier-label">
                    {getOrdinalLabel(index)} Breakpoint
                  </div>
                  <input
                    type="number"
                    value={bp.amount}
                    placeholder="$"
                    className="scenario-input"
                    onChange={(e) =>
                      updateBreakpoint(index, "amount", e.target.value)
                    }
                  />
                </div>
                <div className="percentage-input">
                  <div>% Fee</div>
                  <input
                    type="number"
                    value={bp.percentage}
                    placeholder="%"
                    className="scenario-input"
                    onChange={(e) =>
                      updateBreakpoint(index, "percentage", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <div
              className="tier-breakpoint-btn-wrapper"
              onClick={addBreakpoint}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc9f7f93b265b7a99dbd7335ed6fe561e3e2642aabe2c1ba8aa6b8203b298043?apiKey=f95b5ca361ef4526b1cb461f7b2405ea&"
                className="img"
              />
              <div className="tier-breakpoint-btn">Add Another Breakpoint</div>
            </div>

            {/* <div>
              <h4>Breakpoints Complete</h4>
              <p>{Math.round(calculateBreakpointProgress())}%</p>
            </div> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fee-container">
      <div className="fee-title">Financial Professional Fee</div>
      <div className="fee-options-container">
        <label className="fee-option">
          <input
            type="radio"
            value="flat"
            checked={feeType === "flat"}
            onChange={handleFeeChange}
            className="radio-input"
          />
          <div className="fee-option-title">Flat</div>
        </label>
        <label className="fee-option">
          <input
            type="radio"
            value="fixed"
            checked={feeType === "fixed"}
            onChange={handleFeeChange}
            className="radio-input"
          />
          <div className="fee-option-title">Fixed</div>
        </label>
        <label className="fee-option">
          <input
            type="radio"
            value="tier"
            checked={feeType === "tier"}
            onChange={handleFeeChange}
            className="radio-input"
          />
          <div className="fee-option-title">Tier</div>
        </label>
        <label className="fee-option">
          <input
            type="radio"
            value="breakpoint"
            checked={feeType === "breakpoint"}
            onChange={handleFeeChange}
            className="radio-input"
          />
          <div className="fee-option-title">Breakpoint</div>
        </label>
      </div>
      <div>{renderFeeContent()}</div>
    </div>
  );
};

export default FinancialProfessionalFee;
