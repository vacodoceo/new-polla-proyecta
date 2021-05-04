import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

import firebase from '../../firebase';
import CreatePollaDialog from './CreatePollaDialog';
import FeedbackDialog from '../../components/FeedbackDialog';

const steps = {
  instructions: { label: 'Instrucciones' },
  group: { label: 'Fase de grupos' },
  quarters: { label: 'Cuartos de final' },
  final: { label: 'Final' },
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const Bet = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createPollaDialogOpen, setCreatePollaDialogOpen] = useState(false);
  const [pollaId, setPollaId] = useState();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const createPolla = async (name) => {
    const pollaIdResponse = await firebase
      .functions()
      .httpsCallable('createPolla')({
      name,
    });
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

  const FeedbackDialogDescription = () => (
    <>
      Tu polla ya está registrada, pero recuerda que{' '}
      <em>debes pagarla para que empiece a participar</em>. Para ir a pagar solo
      debes pulsar el botón de abajo, o bien hacerlo desde el menú de{' '}
      <em>Mis Pollas.</em>
    </>
  );

  const FeedbackDialogActions = () => (
    <Button
      component={Link}
      to={`/payment?pollas=${pollaId}`}
      variant="contained"
      color="primary"
    >
      Ir a pagar
    </Button>
  );

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
      <Button onClick={handleNextClick} variant="contained" color="primary">
        Siguiente
      </Button>
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
        title="¡Dale un nombre a tu polla!"
      />
    </Container>
  );
};

export default Bet;

// 5416 7526 0258 2580
// 123
// 11/25
// 144746679-f94c1140-fb06-43e1-80d4-40915e341d72
