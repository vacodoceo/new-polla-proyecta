import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import _ from 'lodash';

import firebase from '../../firebase';
import FeedbackDialog from '../../components/FeedbackDialog';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  progress: {
    marginRight: theme.spacing(1),
  },
}));

const Payment = () => {
  const query = useQuery();
  const history = useHistory();
  const [checkout, setCheckout] = useState();
  const [checkoutError, setCheckoutError] = useState();
  const [pollas, setPollas] = useState([]);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    const newPollas = query.get('pollas')?.split(',');
    if (_.isEmpty(newPollas)) {
      history.push('/');
    }

    setPollas(newPollas);
  }, []);

  useEffect(async () => {
    if (!_.isEmpty(pollas)) {
      const { data: preferenceId } = await firebase
        .functions()
        .httpsCallable('createPreference')({
        pollas,
      });

      if (preferenceId) {
        // eslint-disable-next-line no-undef
        const mp = new MercadoPago(
          process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY,
          {
            locale: 'es-CL',
          }
        );

        setCheckout(
          mp.checkout({
            preference: {
              id: preferenceId,
            },
          })
        );
      } else {
        setCheckoutError(true);
      }
    }
  }, [pollas]);

  const handlePay = () => {
    if (checkoutError) {
      setFeedbackDialogOpen(true);
    } else {
      checkout?.open();
    }
  };

  const FeedbackDialogDescription = () => (
    <>
      Inténtalo nuevamente ingresando desde el menú <em>Mis Pollas</em>,
      seleccionando tus pollas a pagar, y presionando el botón{' '}
      <em>Pagar pollas</em>. Si el error persiste, por favor ponte en contacto
      con nosotres por Instagram @proyectauc o al correo ti@trabajosproyecta.cl
    </>
  );

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Button
        onClick={handlePay}
        variant="contained"
        color="primary"
        disabled={!checkout && !checkoutError}
      >
        {!checkout && !checkoutError && (
          <CircularProgress
            className={classes.progress}
            color="secondary"
            size={20}
          />
        )}{' '}
        Pagar
      </Button>
      <FeedbackDialog
        description={FeedbackDialogDescription}
        dialogOpen={feedbackDialogOpen}
        status="error"
        title="Hubo un error al procesar tu pago"
        handleClose={() => setFeedbackDialogOpen(false)}
      />
    </Container>
  );
};

export default Payment;

// 5416 7526 0258 2580
