import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Match from '../../components/Match';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(296px, 360px))',
    justifyContent: 'center',
    width: 'clamp(296px, 100%, 760px)',
    gap: theme.spacing(2),
  },
}));

const MatchesPhase = ({ matches }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      {matches.map((match) => (
        <Match {...match} key={`${match.name}`} editable={false} />
      ))}
    </div>
  );
};

MatchesPhase.propTypes = {
  matches: PropTypes.array,
};

export default MatchesPhase;
