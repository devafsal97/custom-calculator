import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const steps = [1, 2, 3, 4, 5, 6];

const StepIndicatorComponent = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  // Define your steps as an array of pathnames
  const stepPaths = [
    "/",
    "/fpfee",
    "/programfee",
    "/strategistfee",
    "/umasma",
    "/additionalpage",
    "/resultpage",
  ];

  useEffect(() => {
    // Find the index of the current path in the stepPaths array
    const currentStep = stepPaths.indexOf(location.pathname);
    setActiveStep(currentStep);
  }, [location.pathname]);
  // Custom styling for the stepper container
  const stepperStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: " white",
    color: "red",
  };

  // Custom styling for each step
  const stepStyle = (index) => ({
    flex: "1",
    height: "5px",
    backgroundColor:
      activeStep >= index ? "rgb(0, 74, 100)" : "rgb(132, 132, 137)",
    margin: "0 1px", // Adjust spacing between steps
  });

  return (
    <Box sx={stepperStyle}>
      {stepPaths.map((_, index) => (
        <div key={`step-${index}`} style={stepStyle(index)} />
      ))}
    </Box>
  ); 
};

export default StepIndicatorComponent;
