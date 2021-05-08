import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: theme.spacing(2),
}));

const BetGroupPhase = () => {
  const classes = useStyles();

  return <Paper className={classes.paper}></Paper>;
};

export default BetGroupPhase;
