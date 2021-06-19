/* eslint-disable react/display-name */
import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import {
  Breadcrumbs,
  Button,
  Container,
  Link as LinkMUI,
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

const steps = ['Fase de grupos', 'Cuartos de final', 'Semifinal', 'Final'];

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
  stepper: {
    padding: theme.spacing(0),
    width: 'clamp(280px, 100%, 600px)',
  },
}));

const PollaDetails = () => {
  const { pollaId } = useParams();
  const [polla, loading, error] = useDocumentDataOnce(
    firebase.firestore().doc(`pollas/${pollaId}`)
  );
  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BetGroupPhase order={polla.results.groups} />;
      case 1:
        return (
          <MatchesPhase
            title="Cuartos de Final"
            matches={polla.results.quarterFinals}
          />
        );
      case 2:
        return (
          <MatchesPhase title="Semifinal" matches={polla.results.semiFinals} />
        );
      case 3:
        return (
          <MatchesPhase
            title="Tercer lugar y final"
            matches={polla.results.finals}
          />
        );
      default:
        return <></>;
    }
  };

  const classes = useStyles();

  if (error || (!loading && !polla)) {
    return <Redirect to="/pollas" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkMUI color="inherit" href="/pollas">
            Mis Pollas
          </LinkMUI>
          <Typography color="textPrimary">{pollaId}</Typography>
        </Breadcrumbs>
        <Typography variant="h4">
          <span className={classes.lighterTitle}>Resultados de</span>{' '}
          {polla.name}
        </Typography>
      </Container>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        nonLinear
        className={classes.stepper}
      >
        {steps.map((step, index) => (
          <Step key={step}>
            <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
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
          disabled={activeStep === 3}
        >
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default PollaDetails;

//
// 123
// 11/25
// 144746679-f94c1140-fb06-43e1-80d4-40915e341d72
