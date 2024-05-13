import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Enter Account Value',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    label: 'Select Financial Professional Fee',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    label: 'Configure Strategist Fee',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    label: 'Configure Program Fee',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    label: 'Add Additional Details',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    label: 'View Scenario Results',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption"></Typography>
                ) : null
              }
              sx={{
                '& .MuiStepIcon-root': { color: '#186ADE' },
                fontFamily: 'Avenir Next, sans-serif',
                color: '#186ADE',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Avenir Next, sans-serif',
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography
                sx={{
                  fontFamily: 'Avenir Next, sans-serif',
                }}
              >
                {step.description}
              </Typography>
              {/* <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                {index === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
              {/* {index !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              )} */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography
            sx={{
              fontFamily: 'Avenir Next, sans-serif',
            }}
          >
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
