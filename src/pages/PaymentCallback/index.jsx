import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Done as DoneIcon, Error as ErrorIcon } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

import firebase from '../../firebase';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const feedbackIcon = {
  success: DoneIcon,
  error: ErrorIcon,
};

const feedbackTitle = {
  loading: 'Verificando pago...',
  success: '¡Se procesó correctamente tu pago!',
  error: 'Hubo un error al verificar su pago',
};

const feedbackDescription = {
  success:
    'Tu polla ya está participando y en unos segundos se actualizará el estado de tu pago en tu lista de pollas. ¡Muchas gracias!',
  error:
    'Por favor ponte en contacto con nosotres al Instagram @proyectauc o al correo ti@trabajosproyecta.cl.',
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    marginBottom: theme.spacing(2),

    '& svg': {
      height: theme.spacing(10),
      width: theme.spacing(10),
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2, 1),
  },
  description: {
    marginTop: theme.spacing(2),
    maxWidth: '60ch',
    fontSize: '1.4rem',
    '& em': {
      fontStyle: 'normal',
      fontWeight: 600,
    },
  },
}));

const PaymentCallback = () => {
  const [status, setStatus] = useState('loading');
  const query = useQuery();

  useEffect(async () => {
    const payment_id = query.get('payment_id');
    console.log(payment_id);

    const paymentResponse = await firebase
      .functions()
      .httpsCallable('verifyPayment')({ payment_id });
    const paymentStatus = paymentResponse.data;
    setStatus(paymentStatus === 'approved' ? 'success' : 'error');
  }, []);

  const avatarBackground = status === 'error' ? red['A700'] : green['A700'];
  const FeedbackIcon = feedbackIcon[status];

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        {status === 'loading' ? (
          <CircularProgress size={80} className={classes.avatar} />
        ) : (
          <Avatar
            className={classes.avatar}
            style={{ background: avatarBackground }}
          >
            <FeedbackIcon />
          </Avatar>
        )}

        <Typography variant="h3" align="center">
          {feedbackTitle[status]}
        </Typography>
      </Box>

      <Typography
        className={classes.description}
        align="center"
        color="textSecondary"
      >
        {feedbackDescription[status]}
      </Typography>
    </Container>
  );
};

export default PaymentCallback;

// Botón de otra polla
