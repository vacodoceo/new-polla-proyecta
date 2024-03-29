/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core';

import firebase from '../../firebase';
import BetInstructions from './Instructions';
import BetGroupPhase from './GroupPhase';
import MatchesPhase from './MatchesPhase';
import CreatePollaDialog from './CreatePollaDialog';
import FeedbackDialog from '../../components/FeedbackDialog';
import { initResults, assortResults } from '../../utils/matches';

const steps = ['Fase de grupos', 'Octavos de final', 'Cuartos de final', 'Semifinal', 'Final'];

const useStyles = makeStyles((theme) => ({
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
  dialogPaper: { margin: theme.spacing(1) },
  stepper: {
    padding: theme.spacing(0),
    width: 'clamp(280px, 100%, 600px)',
  },
}));

const Bet = () => {
  const history = useHistory();
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isStepIncomplete, setIsStepIncomplete] = useState(false);
  const [results, setResults] = useState(initResults);
  const [createPollaDialogOpen, setCreatePollaDialogOpen] = useState(false);
  const [pollaId, setPollaId] = useState();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    const currentStepIncomplete = checkStepIncomplete();
    setIsStepIncomplete(isStepIncomplete && currentStepIncomplete);
  }, [activeStep, results]);

  const createPolla = async (name, seller) => {
    const pollaIdResponse = await firebase
      .functions()
      .httpsCallable('createPolla')({ name, results, seller });
    setPollaId(pollaIdResponse.data);
    setCreatePollaDialogOpen(false);
    setFeedbackDialogOpen(true);
  };

  const handleNextClick = () => {
    const currentStepIncomplete = checkStepIncomplete();
    if (currentStepIncomplete) {
      setIsStepIncomplete(currentStepIncomplete);
    } else {
      if (activeStep === Object.keys(steps).length - 1) {
        setCreatePollaDialogOpen(true);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleGroupOrderChange = (group, groupOrder) => {
    const newResults = assortResults({
      ...results,
      groups: { ...results.groups, [group]: groupOrder },
    });
    setResults(newResults);
  };

  const handleMatchChange = (stage) => (index) => (match) => {
    const newStageResults = results[stage].slice();
    newStageResults[index] = match;
    const newResults = assortResults({ ...results, [stage]: newStageResults });

    setResults(newResults);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <BetGroupPhase
            order={results.groups}
            handleGroupOrderChange={handleGroupOrderChange}
          />
        );
      case 1:
        return (
          <MatchesPhase
            title="Octavos de final"
            matches={results.roundOfSixteen}
            handleMatchChange={handleMatchChange('roundOfSixteen')}
          />
        );
      case 2:
        return (
          <MatchesPhase
            title="Cuartos de Final"
            matches={results.quarterFinals}
            handleMatchChange={handleMatchChange('quarterFinals')}
          />
        );
      case 3:
        return (
          <MatchesPhase
            title="Semifinal"
            matches={results.semiFinals}
            handleMatchChange={handleMatchChange('semiFinals')}
          />
        );
      case 4:
        return (
          <MatchesPhase
            title="Tercer lugar y final"
            matches={results.finals}
            handleMatchChange={handleMatchChange('finals')}
          />
        );
      default:
        return <></>;
    }
  };

  const checkStepIncomplete = () => {
    switch (activeStep) {
      case 0:
        return false;
      case 1:
        return !results.roundOfSixteen.every(
          (match) => match.firstCountry.winner || match.secondCountry.winner
        );
      case 2:
        return !results.quarterFinals.every(
          (match) => match.firstCountry.winner || match.secondCountry.winner
        );
      case 3:
        return !results.semiFinals.every(
          (match) => match.firstCountry.winner || match.secondCountry.winner
        );
      case 4:
        return !results.finals.every(
          (match) => match.firstCountry.winner || match.secondCountry.winner
        );
      default:
        return true;
    }
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
        to={'/pollas'}
        variant="contained"
        color="primary"
      >
        Ir a mis pollas
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

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Dialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
        PaperProps={{ className: classes.dialogPaper }}
      >
        <BetInstructions />
        <DialogActions>
          <Button onClick={() => setInstructionsOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent()}
      {isStepIncomplete && (
        <Typography
          variant="body1"
          color="error"
          className={classes.error}
          align="center"
        >
          ¡Debes seleccionar un ganador para cada partido antes de seguir a la
          siguiente fase!
        </Typography>
      )}
      <div className={classes.buttonWrapper}>
        {activeStep > 0 && (
          <Button
            className={classes.button}
            onClick={() => setActiveStep(activeStep - 1)}
            variant="contained"
          >
            Anterior
          </Button>
        )}

        <Button
          className={classes.button}
          onClick={() => setInstructionsOpen(true)}
          variant="contained"
        >
          Instrucciones
        </Button>

        <Button
          className={classes.button}
          onClick={handleNextClick}
          variant="contained"
          color="primary"
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
