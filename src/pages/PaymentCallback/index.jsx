import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

import firebase from '../../firebase';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: green['A700'],
    height: theme.spacing(12),
    width: theme.spacing(12),
    marginBottom: theme.spacing(2),
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
  icon: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
}));

const PaymentCallback = () => {
  const query = useQuery();

  useEffect(async () => {
    const payment_id = query.get('payment_id');
    console.log(payment_id);

    // const preferenceResponse = await firebase
    //   .functions()
    //   .httpsCallable('verifyPayment')({
    //   payment_id,
    //   preference_id,
    // });
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        <Avatar className={classes.avatar}>
          <DoneIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h3" align="center">
          ¡Se procesó correctamente tu pago!
        </Typography>
      </Box>

      <Typography
        className={classes.description}
        align="center"
        color="textSecondary"
      >
        Tu polla ya está participando y en unos segundos se actualizará el
        estado de tu pago en tu lista de pollas. ¡Muchas gracias!
      </Typography>
    </Container>
  );
};

export default PaymentCallback;

// Botón de otra polla
// http://localhost:3000/payment?collection_id=1236440581&collection_status=approved&payment_id=1236440581&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=2627191805&preference_id=144746679-2171e103-7a1f-4cc7-b513-cf9af6467e78&site_id=MLC&processing_mode=aggregator&merchant_account_id=null
// 1236440581 144746679-2171e103-7a1f-4cc7-b513-cf9af6467e78
