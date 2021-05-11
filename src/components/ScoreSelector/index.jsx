import PropTypes from 'prop-types';
import { ButtonBase, makeStyles, OutlinedInput } from '@material-ui/core';
import { Remove as MinusIcon, Add as PlusIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    width: theme.spacing(4),
    background: theme.palette.primary.main,
    borderRadius: 0,
    border: `1px solid ${theme.palette.primary.main}`,

    '& svg': {
      fill: theme.palette.secondary.main,
    },
  },

  container: {
    height: '2rem',
    display: 'flex',

    '&>:first-child': {
      borderBottomLeftRadius: theme.spacing(0.5),
      borderTopLeftRadius: theme.spacing(0.5),
      borderRight: 'none',
    },

    '&>:last-child': {
      borderBottomRightRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5),
      borderLeft: 'none',
    },
  },

  scoreField: {
    height: '100%',
    width: '4ch',
    '& > *': {
      borderRadius: 0,
    },

    // Remove number spinner
    /* Chrome, Safari, Edge, Opera */
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    // /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
}));

const ScoreSelector = ({ score, handleChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ButtonBase
        className={classes.button}
        onClick={() => handleChange(score - 1)}
      >
        <MinusIcon />
      </ButtonBase>
      <OutlinedInput
        variant="outlined"
        type="number"
        size="small"
        className={classes.scoreField}
        max={7}
        value={score}
        onChange={(e) => handleChange(e.target.value)}
      ></OutlinedInput>
      <ButtonBase
        className={classes.button}
        onClick={() => handleChange(score + 1)}
      >
        <PlusIcon />
      </ButtonBase>
    </div>
  );
};

ScoreSelector.propTypes = {
  handleChange: PropTypes.func,
  score: PropTypes.number,
};

export default ScoreSelector;
