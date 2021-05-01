import { useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const steps = {
  instructions: { label: 'Instrucciones' },
  group: { label: 'Fase de grupos' },
  quarters: { label: 'Cuartos de final' },
  final: { label: 'Final' },
};

const Bet = () => {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {Object.entries(steps).map(([key, { label }]) => (
          <Step key={key}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default Bet;
