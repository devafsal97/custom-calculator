import React, { useState } from 'react';
import './ProgramFeeSelection.css';

const programOptions = [
  {
    id: 1,
    title: "Advisor-directed",
    description: "The Financial Professional serves as the Portfolio Manager.",
    value: "advisor-directed"
  },
  {
    id: 2,
    title: "CAAP",
    description: "The Financial Professional partners with their enterprise to utilize shared models.",
    value: "caap"
  },
  {
    id: 3,
    title: "CAAP Small Account Solutions",
    description: "Strategist-directed solution providing access to world-class money managers for accounts over $50,000.",
    value: "caap-small-account"
  },
  {
    id: 4,
    title: "Team-directed",
    description: "Strategist-directed solution providing access to world-class money managers for accounts starting at $5,000.",
    value: "team-directed"
  },
  {
    id: 5,
    title: "UMA/SMA",
    description: "Blend multiple investment strategies, including CAAP mutual fund, ETF, and Equity SMAs, into one account starting at $100,000.",
    value: "uma-sma"
  }
];

const ProgramFeeSelection = ({ onOptionChange,handleChange }) => {    
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
      handleChange(event)
      const option = event.target.value;
      setSelectedOption(option);
      onOptionChange(option); // Call the prop function with the selected option
    };
  

  return (
    <div className="program-container">
      <h3 className="program-title">Select Program Fee</h3>
      <p className="program-description">
        The WealthPort Program Fee covers operating and administrative costs associated with WealthPort, including clearing, custody, trading, and some common ancillary fees.
      </p>
      <div className="program-grid">
        {programOptions.map((option) => (
          <label key={option.id} className="program-card">
            <div className="program-card-header">
              <input
                type="radio"
                name="paymentOption"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
                className="radio-input"
              />
              <div className="program-card-title">{option.title}</div>
            </div>
            <p className="program-card-description">{option.description}</p>
          </label>
        ))}
      </div>
     
    </div>
  );
};

export default ProgramFeeSelection;
