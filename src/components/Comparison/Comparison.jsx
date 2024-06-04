import React from "react";
import "./comparison.css";
import { useCalculationStorage } from "../../context/StorageContext";

const Comparison = () => {
  const {
    fpValues,
    accountValue,
    fundExpenses,
    fpPayout,
    houseHoldValue,
    feeType,
    programFee,
    programFeeValues,
    strategistFeeValues,
    totalAccountFeeValues,
    totalClientFeeValues,
    grossAnnualFeeValues,
    netAnnualFeeValues,
    getCalculationDataValue,
    index,
    setIndex,
    originalIndex,
    setOriginalIndex,
    handleEdit,
    handleDelete,
  } = useCalculationStorage();

  return (
   <div className="table-wrapper">
  <div className="table-container">
    <div className="table">
      <div className="header-row">
        <div className="header-cell">
          
        </div>
        <div className="header-value-labels">
          <div className="value-label">Rate (%)</div>
          <div className="value-label">Price ($)</div>
          <div className="value-label">Rate (%)</div>
          <div className="value-label">Price ($)</div>
          <div className="value-label">Rate (%)</div>
          <div className="value-label">Price ($)</div>
        </div>
      </div>
      <div className="header-row">
        <div className="header-cell field-name">
          Fee Details and Scenario Assumptions
        </div>
        <div className="header-scenarios">
          <div className="scenario">Scenario 1</div>
          <div className="scenario">Scenario 2</div>
          <div className="scenario">Scenario 3</div>
        </div>
      </div>
      <div className="field-row">
        <div className="field-name">Account Value</div>
        <div className="account-values-container">
          <div className="account-value">$30,000.00</div>
          <div className="account-value">$10,000.00</div>
          <div className="account-value">$20,000.00</div>
        </div>
      </div>
      <div className="field-row">
        <div className="field-name">Financial Professional Fee</div>
        <div className="values-container">
          <div className="value value-label">0.00%</div>
          <div className="value value-label">$0.00</div>
          <div className="value value-label">0.00%</div>
          <div className="value value-label">$0.00</div>
          <div className="value value-label">0.00%</div>
          <div className="value value-label">$0.00</div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default Comparison;
