import { useState } from 'react';
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
  // Tooltip,
  Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';

import firebase from '../../firebase';
import { Link } from 'react-router-dom';

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
    marginBottom: theme.spacing(1),
    background: 'white',
    padding: theme.spacing(2),
    display: 'grid',
    gap: theme.spacing(2),
  },
  tableRow: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      background: 'whitesmoke',
    },
  },
  tableWrapper: {
    width: '100%',
    overflow: 'auto',
  },
  unpaid: {
    background: red[700],
    color: 'white',
  },
  pollaDetails: {
    background: theme.palette.primary.light,
    color: 'white'
  }
}));

const Pollas = () => {
  const [user] = useAuthState(firebase.auth());
  const [pollas] = useCollectionData(
    firebase.firestore().collection('pollas_qatar').where('userId', '==', user.uid),
    { idField: 'id' }
  );
  const unpaidPollas = pollas?.filter((polla) => polla.status === 'unpaid')
  const [selectedPollas, setSelectedPollas] = useState([]);
  // const payPollasErrors = {
  //   empty: '¡Debes seleccionar al menos 1 polla!',
  //   paid: '¡Tienes seleccionadas 1 o más pollas pagadas!',
  // };
  // const [payError, setPayError] = useState(payPollasErrors.empty);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedPollas(unpaidPollas.map((polla) => polla.id));
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

  // useEffect(() => {
  //   const selectedPollasData = selectedPollas.map((pollaId) =>
  //     _.find(pollas, (polla) => polla.id === pollaId)
  //   );

  //   if (_.isEmpty(selectedPollasData)) {
  //     setPayError(payPollasErrors.empty);
  //   } else if (
  //     !selectedPollasData.every((polla) => polla.status === 'unpaid')
  //   ) {
  //     setPayError(payPollasErrors.paid);
  //   } else setPayError();
  // }, [selectedPollas]);

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Mis Pollas</Typography>
        <Typography variant="body1" className={classes.description}>
          Acá puedes ver todas tus pollas y su información 🤓. Si deseas saber
          qué apostaste en una de tus pollas, basta con que hagas click en su
          fila de la tabla para ver tus resultados apostados 🧐.
        </Typography>

        <div className={classes.tableWrapper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selectedPollas.length > 0 &&
                      selectedPollas.length < unpaidPollas.length
                    }
                    checked={
                      selectedPollas.length > 0 &&
                      selectedPollas.length === unpaidPollas.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Identificador único</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Puntaje</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {pollas?.map((polla) => (
                <TableRow
                  key={polla.id}
                  className={classes.tableRow}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedPollas.includes(polla.id)}
                      onChange={() => handleSelectClick(polla.id)}
                      disabled={polla.status === 'paid'}
                    />
                  </TableCell>
                  <TableCell>{polla.name}</TableCell>
                  <TableCell className={classes.code}>{polla.id}</TableCell>
                  <TableCell>
                    {moment(polla.createdAt.toDate()).format('L LT')}
                  </TableCell>
                  <TableCell align="center">
                    {polla.status === 'paid' ? (
                      <Chip label="Pagada" className={classes.paid} />
                    ) : (
                      <Chip label="No pagada" className={classes.unpaid} />
                    )}
                  </TableCell>
                  <TableCell align="center">{polla.score}</TableCell>
                  <TableCell padding="button">
                    <Button
                      component={Link}
                      to={`pollas/${polla.id}`}
                      className={classes.pollaDetails}
                    >
                      Ver polla
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <Tooltip
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
        </Tooltip> */}
      </Paper>
    </Container>
  );
};

export default Pollas;
