import React, { useEffect } from "react";
import "./StepFooter.css";
import { useNavigate } from "react-router-dom";
import { useCalculationStorage } from "../../context/StorageContext";
const StepFooter = ({ currentStep = 1, from, setRender, render }) => {
  const { fpValues,stepsCompleted,setStepsCompleted } = useCalculationStorage();
  const navigate = useNavigate();
  const stepLabels = {
    1: "Financial Professional Fee",
    2: "Financial Professional Fee",
    3: "Program Fee",
    4: "Program Fee Payment",
    5: "Strategist Fee",
    6: "Additional Detail",
  };
  const handleCancel = () => {
    navigate("/");
  };
  const handleSummary = () => {
    if(stepsCompleted)navigate("/results");
  };

  return (
    <div className="step-footer">
      {from != "estimated-results" ? (
        <div className="step-info">{stepLabels[currentStep]}</div>
      ) : (
        <div className="result step-info">
          <span>Financial Professional Fee</span>
          <span>{`Rate: ${fpValues.rate || "000"} %`}</span>
          <span>{`Price: ${fpValues.price || "000"} $`}</span>
        </div>
      )}
      <div className="step-actions">
        <div className="step-cancel" onClick={handleCancel}>
          Cancel
        </div>
        <div className={`step-save ${stepsCompleted !== true ? "disabled" : ""}`} onClick={handleSummary}>
          {from == "estimated-results"
            ? "Create New Estimate"
            : "Save and View Summary"}
        </div>
      </div>
    </div>
  );
};

export default StepFooter;
