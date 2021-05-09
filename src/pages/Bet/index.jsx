/* eslint-disable react/display-name */
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

import firebase from '../../firebase';
import BetInstructions from './Instructions';
import BetGroupPhase from './GroupPhase';
import BetQuarterFinals from './QuarterFinals';
import BetFinals from './Finals';
import CreatePollaDialog from './CreatePollaDialog';
import FeedbackDialog from '../../components/FeedbackDialog';
import { groups } from '../../utils/countries';

const initResults = {
  A: groups.A.map((country) => country.value),
  B: groups.B.map((country) => country.value),
};

const steps = {
  instructions: { label: 'Instrucciones' },
  group: { label: 'Fase de grupos' },
  quarters: { label: 'Cuartos de final' },
  final: { label: 'Final' },
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    justifyItems: 'center',
    display: 'grid',
  },
  buttonWrapper: {
    marginTop: theme.spacing(2),
    display: 'grid',
    justifySelf: 'center',
    gridTemplateColumns: 'auto auto',
    gap: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(2, 0),
    width: 'clamp(280px, 100%, 600px)',
  },
}));

const Bet = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [results, setResults] = useState(initResults);
  const [createPollaDialogOpen, setCreatePollaDialogOpen] = useState(false);
  const [pollaId, setPollaId] = useState();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const createPolla = async (name) => {
    const pollaIdResponse = await firebase
      .functions()
      .httpsCallable('createPolla')({ name });
    setPollaId(pollaIdResponse.data);
    setCreatePollaDialogOpen(false);
    setFeedbackDialogOpen(true);
  };

  const handleNextClick = () => {
    if (activeStep === Object.keys(steps).length - 1) {
      setCreatePollaDialogOpen(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleGroupOrderChange = (group, groupOrder) => {
    setResults({ ...results, [group]: groupOrder });
  };

  const stepsComponents = {
    0: {
      component: BetInstructions,
      props: {},
    },
    1: {
      component: BetGroupPhase,
      props: {
        defaultOrder: { A: results.A, B: results.B },
        handleGroupOrderChange,
      },
    },
    2: { component: BetQuarterFinals, props: {} },
    3: { component: BetFinals, props: {} },
  };

  // Feedback component props
  const FeedbackDialogDescription = () => (
    <>
      Tu polla ya está registrada, pero recuerda que{' '}
      <em>debes pagarla para que empiece a participar</em>. Para ir a pagar solo
      debes pulsar el botón de abajo, o bien hacerlo desde el menú de{' '}
      <em>Mis Pollas.</em>
    </>
  );

  const FeedbackDialogActions = () => (
    <>
      <Button onClick={() => window.location.reload()} variant="contained">
        Crear otra polla
      </Button>
      <Button
        component={Link}
        to={`/payment?pollas=${pollaId}`}
        variant="contained"
        color="primary"
      >
        Ir a pagar
      </Button>
    </>
  );

  const CurrentStepComponent = stepsComponents[activeStep].component;
  const currentStepProps = stepsComponents[activeStep].props;
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {Object.entries(steps).map(([key, { label }]) => (
          <Step key={key}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <CurrentStepComponent {...currentStepProps} />
      <div className={classes.buttonWrapper}>
        {activeStep > 0 && (
          <Button
            onClick={() => setActiveStep(activeStep - 1)}
            variant="contained"
            className={classes.nextButton}
          >
            Anterior
          </Button>
        )}

        <Button
          onClick={handleNextClick}
          variant="contained"
          color="primary"
          className={classes.nextButton}
        >
          Siguiente
        </Button>
      </div>

      <CreatePollaDialog
        dialogOpen={createPollaDialogOpen}
        handleClose={() => setCreatePollaDialogOpen(false)}
        createPolla={createPolla}
      />
      <FeedbackDialog
        actions={FeedbackDialogActions}
        description={FeedbackDialogDescription}
        dialogOpen={feedbackDialogOpen}
        status="success"
        title="¡Polla creada!"
        handleClose={() => history.push('/pollas')}
      />
    </Container>
  );
};

export default Bet;

//
// 123
// 11/25
// 144746679-f94c1140-fb06-43e1-80d4-40915e341d72
