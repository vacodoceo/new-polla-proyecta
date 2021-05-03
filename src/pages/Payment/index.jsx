import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, makeStyles } from '@material-ui/core';

// import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const Payment = () => {
  const { pollaId } = useParams();
  const [checkout, setCheckout] = useState();

  useEffect(() => {
    if (pollaId) {
      // eslint-disable-next-line no-undef
      const mp = new MercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-CL',
      });

      setCheckout(
        mp.checkout({
          preference: {
            id: pollaId,
          },
        })
      );
    }
  }, []);

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Button onClick={checkout?.open} variant="contained" color="primary">
        Pagar
      </Button>
    </Container>
  );
};

export default Payment;

// 5416 7526 0258 2580
// 123
// 11/25
// 144746679-f94c1140-fb06-43e1-80d4-40915e341d72
