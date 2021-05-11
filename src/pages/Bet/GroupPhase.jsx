import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import OrderableGroup from '../../components/OrderableGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    width: 'clamp(240px, 100%, 720px)',
    justifyContent: 'center',
    gap: theme.spacing(4),
  },
}));

const BetGroupPhase = ({ order, handleGroupOrderChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrderableGroup
        title="Grupo A"
        id="A"
        order={order.A}
        handleChange={handleGroupOrderChange}
      />
      <OrderableGroup
        title="Grupo B"
        id="B"
        order={order.B}
        handleChange={handleGroupOrderChange}
      />
    </div>
  );
};

BetGroupPhase.propTypes = {
  order: PropTypes.object.isRequired,
  handleGroupOrderChange: PropTypes.func.isRequired,
};

export default BetGroupPhase;
