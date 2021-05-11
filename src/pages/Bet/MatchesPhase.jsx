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
