import { Container, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 500,
  },
  paper: {
    background: 'white',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),

    '& em': {
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
  },
}));
const FAQ = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}></Paper>
    </Container>
  );
};

export default FAQ;
