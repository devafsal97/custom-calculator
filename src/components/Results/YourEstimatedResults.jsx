import React, { useState } from 'react';
import './YourEstimatedResults.css'; // Create this CSS file for styling

const YourEstimatedResults = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('total-account-fees');

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'total-account-fees':
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">Financial Professional Fee</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Net - Program fee paid by client was selected</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
          </div>
        );
      case 'additional-detail':
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">Financial Professional Fee</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Net - Program fee paid by client was selected</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="result-content">
            <div className="result-row">
              <div className="result-label">Financial Professional Fee</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
            <div className="divider" />
            <div className="result-row">
              <div className="result-label">Net - Program fee paid by client was selected</div>
              <div className="result-value">N/A</div>
              <div className="result-value">N/A</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="results-container">
      <div className="results-title">Your Estimated Results</div>
      <div className="tabs-container">
        <div className={`tab ${activeTab === 'total-account-fees' ? 'active' : ''}`} onClick={() => handleTabSwitch('total-account-fees')}>
          Total Account Fees
          <div className={`tab-underline ${activeTab === 'total-account-fees' ? 'active' : ''}`} />
        </div>
        <div className={`tab ${activeTab === 'additional-detail' ? 'active' : ''}`} onClick={() => handleTabSwitch('additional-detail')}>
          Additional Detail
          <div className={`tab-underline ${activeTab === 'additional-detail' ? 'active' : ''}`} />
        </div>
        <div className={`tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => handleTabSwitch('summary')}>
          Summary
          <div className={`tab-underline ${activeTab === 'summary' ? 'active' : ''}`} />
        </div>
      </div>
      <div className="divider" />
      <div className="results-content">{renderTabContent()}</div>
    </div>
  );
};

export default YourEstimatedResults;
