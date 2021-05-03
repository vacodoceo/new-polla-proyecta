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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: green['A700'],
    height: theme.spacing(12),
    width: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    paddingTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
  description: {
    marginTop: '5vh',
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

  console.log(query);

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
