import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import _ from "lodash";

import firebase from "../../firebase";
import FeedbackDialog from "../../components/FeedbackDialog";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles(theme => ({
  button: {
    justifySelf: "end"
  },
  listItem: {
    padding: theme.spacing(1, 0)
  },
  paper: {
    padding: theme.spacing(2),
    display: "grid"
  },
  paymentMethod: {
    "& em": {
      fontStyle: "normal",
      fontWeight: "bold"
    }
  },
  progress: {
    marginRight: theme.spacing(1)
  },
  root: {
    padding: theme.spacing(2, 0)
  },
  title: {
    marginTop: theme.spacing(2)
  },
  total: {
    fontWeight: 700
  }
}));

const getPrice = quantity => {
  if (quantity < 4) return 2500;
  else if (quantity < 9) return 2250;
  return 2000;
};

const Payment = () => {
  const query = useQuery();
  const history = useHistory();

  const [pollas] = useState(query.get("pollas")?.split(","));
  const [checkout, setCheckout] = useState();
  const [checkoutError, setCheckoutError] = useState();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [pollasData] = useCollectionData(
    firebase
      .firestore()
      .collection("pollas")
      .where("__name__", "in", pollas),
    { idField: "id" }
  );
  const [paymentDisabled, setPaymentDisabled] = useState(true);

  useEffect(() => {
    if (_.isEmpty(pollas)) {
      history.push("/");
    }
  }, [pollas]);

  useEffect(async () => {
    if (!_.isEmpty(pollas)) {
      console.log(pollas);
      const { data: preferenceId } = await firebase
        .functions()
        .httpsCallable("createPreference")({
        pollas
      });

      if (preferenceId) {
        // eslint-disable-next-line no-undef
        const mp = new MercadoPago(
          process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY,
          {
            locale: "es-CL"
          }
        );

        setCheckout(
          mp.checkout({
            preference: {
              id: preferenceId
            }
          })
        );
      } else {
        setCheckoutError(true);
      }
      setTimeout(() => setPaymentDisabled(false), 3000);
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
      seleccionando tus pollas a pagar, y presionando el botón{" "}
      <em>Pagar pollas</em>. Si el error persiste, por favor ponte en contacto
      con nosotres por Instagram @proyectauc o al correo ti@trabajosproyecta.cl
    </>
  );

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Resumen de pago
        </Typography>
        <List disablePadding>
          {pollasData?.map(polla => (
            <ListItem className={classes.listItem} key={polla.id}>
              <ListItemText primary={polla.name} secondary={polla.id} />
              <Typography variant="body2">
                ${getPrice(pollas.length).toLocaleString("de-DE")}
              </Typography>
            </ListItem>
          ))}

          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              $
              {(getPrice(pollas.length) * pollas.length).toLocaleString(
                "de-DE"
              )}
            </Typography>
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Medio de pago
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          className={classes.paymentMethod}
          align="justify"
        >
          Nuestro único medio de pago mediante esta plataforma es{" "}
          <em>Mercado Pago</em>. Si tienes dudas sobre como funciona este método
          o prefieres transferirnos el dinero directamente, no dudes en
          contactarnos en nuestro instagram
          (@proyectauc)
        </Typography>

        <Button
          onClick={handlePay}
          variant="contained"
          color="primary"
          disabled={paymentDisabled}
          className={classes.button}
        >
          {paymentDisabled && (
            <CircularProgress
              className={classes.progress}
              color="secondary"
              size={20}
            />
          )}
          Pagar
        </Button>
        <FeedbackDialog
          description={FeedbackDialogDescription}
          dialogOpen={feedbackDialogOpen}
          status="error"
          title="Hubo un error al procesar tu pago"
          handleClose={() => setFeedbackDialogOpen(false)}
        />
      </Paper>
    </Container>
  );
};

export default Payment;

// 5416 7526 0258 2580
