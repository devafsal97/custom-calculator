import Styles from "./stepindicator.module.css";

const StepIndicator = ({ currentStep }) => {
  // Define your steps as an array of pathnames
  const steps = [
    "HomePage",
    "FpFee",
    "ProgramFee",
    "StrategistFee",
    "AdditionalPage",
    "ResultPage",
  ];

  // Adjust the currentStep if it's "UmaSma"
  let adjustedCurrentStep = currentStep;
  if (adjustedCurrentStep === "UmaSma") {
    adjustedCurrentStep = "StrategistFee";
  }

  const currentStepIndex = steps.indexOf(adjustedCurrentStep);

  console.log("currentStep:", adjustedCurrentStep);
  console.log("currentStepIndex:", currentStepIndex);

  return (
    <div className={Styles.stepperStyle}>
      {steps.map((step, index) => {
        console.log("step:", step);
        console.log("index:", index);
        return (
          <div
            key={index}
            className={`${
              index <= currentStepIndex ? Styles.greenBg : Styles.redBg
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
