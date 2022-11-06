import { Link } from 'react-router-dom';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import {
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

import firebase from '../../firebase';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontWeight: 500,
  },
  paper: {
    background: 'white',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(4, 2),
    display: 'grid',
    gap: theme.spacing(2),

    '& em': {
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
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
}));
const Ranking = () => {
  const classes = useStyles();
  const [pollas, loading] = useCollectionDataOnce(
    firebase.firestore().collection('pollas_qatar').where('status', '==', 'paid'),
    { idField: 'id' }
  );

  const topTen = pollas?.sort((a, b) => b.score - a.score).slice(0, 10);
  let standing = 1;

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          🏆 Ranking de pollas 🏆
        </Typography>
        <Typography variant="body1" className={classes.description}>
          ¡Estos son los 10 primeros lugares hasta la fecha! Si ves algún
          empate, el orden en que están desplegados en la lista no es relevante.
          Si tienes alguna duda de qué resultados están siendo considerados para
          estos puntajes, puedes revisarlos <Link to="/results">aquí</Link>.
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.tableWrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Nombre de la polla</TableCell>
                  <TableCell>Dueñe</TableCell>
                  <TableCell align="right">Puntaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topTen?.map((polla, index) => {
                  if (index && topTen[index - 1].score > polla.score) {
                    standing += 1;
                  }
                  return (
                    <TableRow
                      component={Link}
                      key={polla.id}
                      className={classes.tableRow}
                      to={`pollas/${polla.id}`}
                    >
                      <TableCell>{standing}°</TableCell>
                      <TableCell>{polla.name}</TableCell>
                      <TableCell className={classes.code}>
                        {polla.userDisplayName ?? '-'}
                      </TableCell>
                      <TableCell align="right">{polla.score}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Ranking;
