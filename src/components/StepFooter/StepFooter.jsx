import React from 'react';
import './StepFooter.css';

const StepFooter = () => {
  return (
    <div className="step-footer">
      <div className="step-info">Financial Professional Fee</div>
      <div className="step-actions">
        <div className="step-cancel">Cancel</div>
        <div className="step-save">Save and View Summary</div>
      </div>
    </div>
  );
};

export default StepFooter;
