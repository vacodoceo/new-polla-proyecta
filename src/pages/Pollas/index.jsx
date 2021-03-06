import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
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
}));

const Pollas = () => {
  const [user] = useAuthState(firebase.auth());
  const [pollas] = useCollectionData(
    firebase.firestore().collection('pollas').where('userId', '==', user.uid),
    { idField: 'id' }
  );
  const [selectedPollas, setSelectedPollas] = useState([]);

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

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Mis Pollas</Typography>
        <Typography variant="body1" className={classes.description}>
          Ac?? puedes ver todas tus pollas y su informaci??n ????. Si deseas saber
          qu?? apostaste en una de tus pollas, basta con que hagas click en su
          fila de la tabla para ver tus resultados apostados ????.
        </Typography>

        <div className={classes.tableWrapper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Identificador ??nico</TableCell>
                <TableCell>Fecha de creaci??n</TableCell>
                <TableCell align="center">Estado</TableCell>
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
                <TableRow
                  component={Link}
                  key={polla.id}
                  className={classes.tableRow}
                  to={`pollas/${polla.id}`}
                >
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
