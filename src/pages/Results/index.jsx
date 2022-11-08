/* eslint-disable react/display-name */
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import {
  Button,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepButton,
  Typography,
} from '@material-ui/core';

import firebase from '../../firebase';
import Loading from '../../components/Loading';
import BetGroupPhase from './GroupPhase';
import MatchesPhase from './MatchesPhase';

const steps = ['Fase de grupos', 'Octavos de final', 'Cuartos de final', 'Semifinal', 'Final'];

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    justifySelf: 'start',
  },
  button: {
    width: '18ch',
    margin: theme.spacing(1, 1),
  },
  buttonWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(4, 1, 0),
    justifyItems: 'center',
    display: 'grid',
    gap: theme.spacing(2),
  },
  lighterTitle: {
    color: theme.palette.text.secondary,
    fontWeight: '300',
  },
  stepButton: {
    '&:not(.Mui-disabled) svg:not(.MuiStepIcon-active)': {
      overflow: 'visible',
      fill: 'transparent',
      stroke: theme.palette.primary.main,

      '& .MuiStepIcon-text': {
        fill: theme.palette.primary.main,
      },
    },
  },
  stepper: {
    padding: theme.spacing(0),
    width: 'clamp(280px, 100%, 600px)',
  },
}));

const Results = () => {
  const [results, loading, error] = useDocumentDataOnce(
    firebase.firestore().doc(`matches_qatar/results`)
  );
  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BetGroupPhase order={results.groups} />;
      case 1:
        return (
          <MatchesPhase
            title="Octavos de Final"
            matches={results.roundOfSixteen}
          />
        );
      case 2:
        return (
          <MatchesPhase
            title="Cuartos de Final"
            matches={results.quarterFinals}
          />
        );
      case 3:
        return <MatchesPhase title="Semifinal" matches={results.semiFinals} />;
      case 4:
        return (
          <MatchesPhase title="Tercer lugar y final" matches={results.finals} />
        );
      default:
        return <></>;
    }
  };

  const isStepDisabled = (step) => {
    switch (step) {
      case 0:
        return !results.groups;
      case 1:
        return !results.roundOfSixteen;
      case 2:
        return !results.quarterFinals;
      case 3:
        return !results.semiFinals;
      case 4:
        return !results.finals;
      default:
        return true;
    }
  };

  const classes = useStyles();

  if (error || (!loading && !results)) {
    return <Redirect to="/pollas" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container>
        <Typography variant="h4">Resultados actuales</Typography>
      </Container>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        nonLinear
        className={classes.stepper}
      >
        {steps.map((step, index) => (
          <Step key={step}>
            <StepButton
              onClick={() => setActiveStep(index)}
              className={classes.stepButton}
              disabled={isStepDisabled(index)}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {getStepContent()}

      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          onClick={() => setActiveStep(activeStep - 1)}
          variant="contained"
          disabled={activeStep === 0}
        >
          Anterior
        </Button>

        <Button
          className={classes.button}
          onClick={() => setActiveStep(activeStep + 1)}
          variant="contained"
          color="primary"
          disabled={activeStep === 4 || isStepDisabled(activeStep + 1)}
        >
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default Results;
