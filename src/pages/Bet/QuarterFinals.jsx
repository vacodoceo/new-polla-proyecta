import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: theme.spacing(2),
}));

const BetQuarterFinals = () => {
  const classes = useStyles();

  return <Paper className={classes.paper}></Paper>;
};

export default BetQuarterFinals;
