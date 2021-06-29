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
  heading: {
    fontWeight: 500,
  },
  paper: {
    background: 'white',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),

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
const FAQ = () => {
  const classes = useStyles();
  const [pollas, loading] = useCollectionDataOnce(
    firebase.firestore().collection('pollas').where('status', '==', 'paid'),
    { idField: 'id' }
  );

  const topTen = pollas.sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Ranking de pollas</Typography>
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
                {topTen?.map((polla) => (
                  <TableRow
                    component={Link}
                    key={polla.id}
                    className={classes.tableRow}
                    to={`pollas/${polla.id}`}
                  >
                    <TableCell>{polla.name}</TableCell>
                    <TableCell className={classes.code}>{polla.id}</TableCell>
                    <TableCell className={classes.code}>***</TableCell>
                    <TableCell align="right">{polla.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default FAQ;
