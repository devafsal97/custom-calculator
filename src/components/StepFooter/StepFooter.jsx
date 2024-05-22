import React, { useEffect } from 'react';
import './StepFooter.css';

const StepFooter = ({ currentStep = 1 }) => {
  const stepLabels = {
    1: "Home",
    2: "Financial Professional Fee",
    3: "Program Fee",
    4: "Program Fee Payment",
    5: "Strategist Fee",
    6: "Additional Detail"
  };

  return (
    <div className="step-footer">
      <div className="step-info">{stepLabels[currentStep]}</div>
      <div className="step-actions">
        <div className="step-cancel">Cancel</div>
        <div className="step-save">Save and View Summary</div>
      </div>
    </div>
  );
};

export default StepFooter;
