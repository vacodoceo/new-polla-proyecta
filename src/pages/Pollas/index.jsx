import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Button,
  Checkbox,
  Chip,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';

import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const payPollasErrors = {
  empty: '¡Debes seleccionar al menos 1 polla!',
  paid: '¡Tienes seleccionadas 1 o más pollas pagadas!',
};

const useStyles = makeStyles((theme) => ({
  button: {
    justifySelf: 'end',
  },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
  },
  container: { paddingTop: theme.spacing(2) },
  description: {
    '& em': {
      fontStyle: 'normal',
      fontWeight: 500,
    },
  },
  paid: {
    background: green[700],
    color: 'white',
  },
  paper: {
    background: 'white',
    padding: theme.spacing(2),
    display: 'grid',
    gap: theme.spacing(2),
  },
  unpaid: {
    background: red[700],
    color: 'white',
  },
}));

const Pollas = () => {
  const [user] = useAuthState(firebase.auth());
  const [pollas] = useCollectionData(
    firebase.firestore().collection('pollas').where('userId', '==', user.uid),
    { idField: 'id' }
  );
  const [selectedPollas, setSelectedPollas] = useState([]);
  const [payError, setPayError] = useState(payPollasErrors.empty);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedPollas(pollas.map((polla) => polla.id));
      return;
    }
    setSelectedPollas([]);
  };

  const handleSelectClick = (pollaId) => {
    if (selectedPollas.includes(pollaId)) {
      setSelectedPollas(_.remove(selectedPollas, (id) => id !== pollaId));
      return;
    }
    setSelectedPollas([...selectedPollas, pollaId]);
  };

  useEffect(() => {
    const selectedPollasData = selectedPollas.map((pollaId) =>
      _.find(pollas, (polla) => polla.id === pollaId)
    );

    if (_.isEmpty(selectedPollasData)) {
      setPayError(payPollasErrors.empty);
    } else if (
      !selectedPollasData.every((polla) => polla.status === 'unpaid')
    ) {
      setPayError(payPollasErrors.paid);
    } else setPayError();
  }, [selectedPollas]);

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Mis Pollas</Typography>
        <Typography variant="body1" className={classes.description}>
          Acá puedes ver todas tus pollas y su información 🤓. Si tienes pollas
          sin pagar basta con que las selecciones y presiones el botón{' '}
          <em>PAGAR</em>.
        </Typography>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Identificador único</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Puntaje</TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selectedPollas.length > 0 &&
                    selectedPollas.length < pollas.length
                  }
                  checked={
                    selectedPollas.length > 0 &&
                    selectedPollas.length === pollas.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pollas?.map((polla) => (
              <TableRow key={polla.id}>
                <TableCell>{polla.name}</TableCell>
                <TableCell className={classes.code}>{polla.id}</TableCell>
                <TableCell>
                  {moment(polla.createdAt.toDate()).format('L LT')}
                </TableCell>
                <TableCell>
                  {polla.status === 'paid' ? (
                    <Chip label="Pagada" className={classes.paid} />
                  ) : (
                    <Chip label="No pagada" className={classes.unpaid} />
                  )}
                </TableCell>
                <TableCell align="right">{polla.score}</TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedPollas.includes(polla.id)}
                    onChange={() => handleSelectClick(polla.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Tooltip
          title={payError}
          aria-label="pay"
          disableHoverListener={!payError}
        >
          <span className={classes.button}>
            <Button
              component={Link}
              to={`/payment?pollas=${selectedPollas.join(',')}`}
              variant="contained"
              color="primary"
              disabled={!!payError}
            >
              Pagar
            </Button>
          </span>
        </Tooltip>
      </Paper>
    </Container>
  );
};

export default Pollas;
