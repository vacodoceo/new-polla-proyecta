import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Match from '../../components/Match';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    width: 'clamp(240px, 100%, 720px)',
    gap: theme.spacing(4),
  },
}));

const MatchesPhase = ({ matches, handleMatchChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      {matches.map((match, index) => (
        <Match
          {...match}
          key={`${match.name}`}
          handleChange={handleMatchChange(index)}
        />
      ))}
    </div>
  );
};

MatchesPhase.propTypes = {
  matches: PropTypes.array,
  handleMatchChange: PropTypes.func,
};

export default MatchesPhase;
