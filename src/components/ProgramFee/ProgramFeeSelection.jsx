import React, { useState } from "react";
import "./ProgramFeeSelection.css";
import { useCalculationStorage } from "../../context/StorageContext";
import Radio from "../Radio/Radio"
const programOptions = [
  {
    id: 1,
    title: "Advisor-directed",
    description: "The Financial Professional serves as the Portfolio Manager.",
    value: "advisor-directed",
    error: "",
  },
  {
    id: 2,
    title: "CAAP",
    description:
      "The Financial Professional partners with their enterprise to utilize shared models.",
    value: "caap",
    error: "",
  },
  {
    id: 3,
    title: "CAAP Small Account Solutions",
    description:
      "Strategist-directed solution providing access to world-class money managers for accounts over $50,000.",
    value: "caap-small-account",
    error: "",
  },
  {
    id: 4,
    title: "Team-directed",
    description:
      "Strategist-directed solution providing access to world-class money managers for accounts starting at $5,000.",
    value: "team-directed",
    error: "",
  },
  {
    id: 5,
    title: "UMA/SMA",
    description:
      "Blend multiple investment strategies, including CAAP mutual fund, ETF, and Equity SMAs, into one account starting at $100,000.",
    value: "uma-sma",
    error: "",
  },
];

const ProgramFeeSelection = ({
  onOptionChange,
  handleChange,
  getCalculationDataValue,
}) => {
  const { index, setIndex } = useCalculationStorage();
  const [selectedOption, setSelectedOption] = useState(
    getCalculationDataValue("paymentOption")[index]
  );
  const [errorOption, setErrorOption] = useState(null);

  const handleOptionChange = (event) => {    
    handleChange(event);
    const option = event.target.value;
    setSelectedOption(option);
    setErrorOption(null); 
    onOptionChange(option);
  };

  // Validation function
  const validateOption = (option) => {
    const accountValue = getCalculationDataValue("account-value")[index];
    switch (option) {
      case "caap-small-account":
        return accountValue >= 50000;
      case "team-directed":
        return accountValue >= 5000;
      case "uma-sma":
        return accountValue >= 100000;
      default:
        return true;
    }
  };

  return (
    <div className="program-container">
      <h3 className="program-title">Select Program Fee</h3>
      <p className="program-description">
        The WealthPort Program Fee covers operating and administrative costs
        associated with WealthPort, including clearing, custody, trading, and
        some common ancillary fees.
      </p>
      <div className="program-grid">
        {programOptions.map((option) => (
          <label key={option.id} className={`program-card ${selectedOption === option.value && !validateOption(option.value) ? "selected" : ""}`}>
            <div className="program-card-header">
              {/* <input
                type="radio"
                name="paymentOption"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
                className="radio-input"
              /> */}
              <Radio
                selectedValue={selectedOption}
                value={option.value}
                onchange={handleOptionChange}
                name="paymentOption"
              />
              <div className="program-card-title">{option.title}</div>
            </div>
            <p className="program-card-description">{option.description}</p>
            {/* Display error message only for the selected option */}
            {selectedOption === option.value &&
              !validateOption(option.value) && (
                <p className="program-card-error-message">
                  {`Account value does not meet program minimum for ${option.title}. Please correct account value to continue.`}
                </p>
              )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProgramFeeSelection;
