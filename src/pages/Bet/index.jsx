import { useState } from 'react';
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
import FeedbackDialog from './FeedbackDialog';

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
  const [preferenceId, setPreferenceId] = useState();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const createPolla = async (name) => {
    const preferenceResponse = await firebase
      .functions()
      .httpsCallable('createPolla')({
      name,
    });
    setPreferenceId(preferenceResponse.data);
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
        preferenceId={preferenceId}
        dialogOpen={feedbackDialogOpen}
      />
    </Container>
  );
};

export default Bet;

// 5416 7526 0258 2580
// 123
// 11/25
// 144746679-f94c1140-fb06-43e1-80d4-40915e341d72
