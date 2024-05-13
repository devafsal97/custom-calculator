import React, { useState } from 'react';
import './StrategistFee.css';
import Select from 'react-select';
import CircularProgress from '../CircularProgress/CircularProgress';

// Example strategist options
const strategistMFETF = [
  { value: '3edge', label: '3EDGE Asset Management' },
  { value: 'american-standard', label: 'American Funds - Standard & Tax-aware' },
  { value: 'american-retirement', label: 'American Funds - Retirement Income' },
  { value: 'blackrock', label: 'BlackRock - Long Horizon ETF' }
];

const strategistEquitySMA = [
  { value: '3edge', label: '3EDGE Asset Management' },
  { value: 'american-standard', label: 'American Funds - Standard & Tax-aware' },
  { value: 'american-retirement', label: 'American Funds - Retirement Income' }
];

const StrategistFee = ({ feeType }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showCalculation, setShowCalculation] = useState(false);
  const [selectedMFETF, setSelectedMFETF] = useState([]);
  const [selectedEquitySMA, setSelectedEquitySMA] = useState([]);

  // Handle dropdown option changes for CAAP
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Toggle visibility for calculation details
  const toggleCalculation = () => {
    setShowCalculation((prev) => !prev);
  };

  // Handle selection changes for MF/ETF strategists
  const handleMFETFChange = (selectedOptions) => {
    setSelectedMFETF(selectedOptions || []);
  };

  // Handle changes for Equity/SMA strategists from react-select
  const handleEquitySMAChange = (selectedOptions) => {
    setSelectedEquitySMA(selectedOptions || []);
  };

  // Function to render selected strategists with input fields for fee and value
  const renderSelectedStrategists = (selectedList) =>
  selectedList.map((selected) => (
    <div key={selected.value} className="strategist-item">
      <div className="strategist-info">
        <div className="strategist-icon" />
        <div className="strategist-name">{selected.label}</div>
      </div>
      <div className="strategist-fee">
        <input type="number" placeholder="%" className="fee-input" />
      </div>
      <div className="fee-dollar-value">$0</div>
    </div>
  ));


  // Render the appropriate fee content based on the selected fee type
  if (feeType === 'advisor-directed') {
    return null; // No content for Advisor-directed
  }

  if (feeType === 'team-directed') {
    return (
      <div className="fee-container">
        <div className="fee-title">Strategist Fee</div>
        <div className="fee-type">Team-directed</div>
        <div className="fee-info">Maximum Team-directed fee is 3%</div>
        <div className="fee-input-label">Enter Flat Fee (%)</div>
        <input type="number" placeholder="%" className="scenario-input" />
      </div>
    );
  }

  if (feeType === 'caap' || feeType === 'caap-small-account') {
    const title = feeType === 'caap' ? 'CAAP' : 'CAAP Small Account Solutions';
    return (
      <div className="strategist-fee-container">
        <div className="strategist-fee-title">Strategist Fee</div>
        <div className="strategist-fee-type">{title}</div>
        <div className="strategist-fee-description">
          The Strategist Fee covers costs associated with asset allocation and model trading services. Applicable to CAAP, UMA, and Team-directed.
        </div>
        <div className="strategist-fee-input-label">{`Strategist ${title}`}</div>
        <select
          className="strategist-dropdown scenario-input"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="" disabled>Select a strategist option</option>
          <option value="option1">American Funds - Standard & Tax-aware</option>
          <option value="option2">Nuveen - Core ESG</option>
          <option value="option3">PIMCO - Fixed Income</option>
          <option value="option4">Vanguard - Core</option>
          <option value="option5">State Street - ETF</option>
          <option value="option6">BlackRock - Long Horizon ETF</option>
        </select>
        <div className="strategist-divider" />
        <div className="strategist-accordion">
          <div className="show-calculation" onClick={toggleCalculation}>
            {/* <span>Show Calculation</span> */}
            {/* <span className="accordion-icon">{showCalculation ? '▼' : '▶'}</span> */}
          </div>
          {showCalculation && <div className="calculation-details">// Calculations shown here</div>}
        </div>
      </div>
    );
  }

  if (feeType === 'uma-sma') {
    return (
        
      <div className="strategist-fee-container">
      <div className="strategist-fee-title">Strategist Fee</div>
      <div className="strategist-fee-type">UMA/SMA</div>
      <div className='progress-fp'>
      <div className="strategist-fee-description">
        The Strategist Fee covers costs associated with asset allocation and model trading services. Applicable to CAAP, UMA, and Team-directed.
      </div>            <CircularProgress percentage={0} /> 
            </div>
      <div className="strategist-select-section">
        <div className="strategist-select-title">Select MF/ETF Strategists</div>
        <Select
          isMulti
          options={strategistMFETF}
          value={selectedMFETF}
          onChange={handleMFETFChange}
          className="strategist-select"
        />
      </div>
      <div className="strategist-table">
        <div className="strategist-table-header">
          <div className="strategist-name-header">Strategist</div>
          <div className="strategist-fee-header">% Fee</div>
          <div className="strategist-value-header">Value in $</div>
        </div>
        {renderSelectedStrategists(selectedMFETF)}
      </div>

      <div className="strategist-select-section">
        <div className="strategist-select-title">Select Equity/SMA Strategists</div>
        <Select
          isMulti
          options={strategistEquitySMA}
          value={selectedEquitySMA}
          onChange={handleEquitySMAChange}
          className="strategist-select"
        />
      </div>
      <div className="strategist-table">
        <div className="strategist-table-header">
          <div className="strategist-name-header">Strategist</div>
          <div className="strategist-fee-header">% Fee</div>
          <div className="strategist-value-header">Value in $</div>
        </div>
        {renderSelectedStrategists(selectedEquitySMA)}
      </div>
    </div>
    );
  }

  return null;
};

export default StrategistFee;
