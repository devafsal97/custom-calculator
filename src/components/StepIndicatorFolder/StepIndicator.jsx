import * as React from "react";
import { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StepIndicator from "./StepIndicator.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCalculationStorage } from "../../context/StorageContext";
const steps = [
  {
    id: 1,
    title: "Enter Account Value",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Select Financial Professional Fee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    title: "Configure Program Fee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    title: "Configure Strategist Fee",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },

  {
    id: 5,
    title: "Add Additional Details",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const VerticalLinearStepper = ({ calculationData }) => {
  const { stepsCompleted, setStepsCompleted } = useCalculationStorage();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    const newCompletedSteps = new Set(completedSteps);

    if (calculationData["scenario-name"] && calculationData["account-value"]) {
      newCompletedSteps.add(1);
    } else {
      newCompletedSteps.delete(1);
    }
    if (calculationData["FPfeeType"]) {
      newCompletedSteps.add(2);
    } else {
      newCompletedSteps.delete(2);
    }
    if (calculationData["paymentOption"]) {
      newCompletedSteps.add(3);
    } else {
      newCompletedSteps.delete(3);
    }

    if (
      (calculationData?.paymentOption === "caap" &&
        Object.keys(calculationData?.strategistFeeCaap).length > 0) ||
      (calculationData?.paymentOption === "caap-small-account" &&
        Object.keys(calculationData?.strategistFeeCaapSmallAccount).length >
          0) ||
      (calculationData?.paymentOption === "team-directed" &&
        calculationData?.teamDirectedInput > 0) ||
      (calculationData?.paymentOption === "uma-sma" &&
        calculationData?.["UMA-SMA-Strategist-Fee"].length > 0)
    ) {
      newCompletedSteps.add(4);
    } else {
      newCompletedSteps.delete(4);
    }

    if (
      calculationData?.AdditionalDetails?.fundExpenses > 0 &&
      calculationData?.AdditionalDetails?.fpPayOut > 0 &&
calculationData?.AdditionalDetails?.houseHoldValue > 0 &&
      calculationData?.AdditionalDetails?.auaDiscount !== ""
    ) {
      newCompletedSteps.add(5);
    } else {
      newCompletedSteps.delete(5);
    }

    setCompletedSteps(newCompletedSteps);
    const allStepsCompleted = newCompletedSteps.size === 5;
    setStepsCompleted(allStepsCompleted);
  }, [calculationData]);

  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`step ${activeStep === step.id ? "active" : ""}`}
          onClick={() => setActiveStep(step.id)}
        >
          <div className="step-line-parent">
            <div className={`step-line ${step.id === 1 ? "noLine" : ""}`}></div>
            {completedSteps.has(step.id) ? (
              <CheckCircleIcon
                sx={{ fill: "#186ADE", width: "18px", height: "18px" }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                sx={{ fill: "#186ADE", width: "18px", height: "18px" }}
              />
            )}
            <div
              className={`step-line ${
                step.id === steps.length ? "noLine" : ""
              }`}
            ></div>
          </div>
          <div className="title">
            {step.title} <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalLinearStepper;
