import React, { useEffect } from "react";
import "./StepFooter.css";
import { useNavigate } from "react-router-dom";
import { useCalculationStorage } from "../../context/StorageContext";
const StepFooter = ({ currentStep = 1, from }) => {
  const {
    fpValues,
    stepsCompleted,
    setStepsCompleted,
    index,
    setIndex,
    originalIndex,
    setOriginalIndex,
  } = useCalculationStorage();
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
    if (stepsCompleted && originalIndex !== null) {
      setIndex(originalIndex);
      setOriginalIndex(null);
      navigate("/results");
    } else if (stepsCompleted && originalIndex === null) {
      navigate("/results");
    }

    if (from && from === "estimated-results") {
      if (index < 2) {
        setIndex(index + 1);
        navigate("/");
      }
    }
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
        <div
          className={`step-save ${
            stepsCompleted !== true ||
            (from == "estimated-results" && index >= 2)
              ? "disabled"
              : ""
          }`}
          onClick={handleSummary}
        >
          {from == "estimated-results"
            ? "Create New Estimate"
            : "Save and View Summary"}
        </div>
      </div>
    </div>
  );
};

export default StepFooter;
