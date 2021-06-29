import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import OrderableGroup from '../../components/OrderableGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 320px))',
    width: 'clamp(240px, 100%, 720px)',
    justifyContent: 'center',
    gap: theme.spacing(4),
    padding: theme.spacing(1, 0),
  },
}));

const BetGroupPhase = ({ order }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrderableGroup
        title="Grupo A"
        id="A"
        order={order.A}
        draggable={false}
      />
      <OrderableGroup
        title="Grupo B"
        id="B"
        order={order.B}
        draggable={false}
      />
    </div>
  );
};

BetGroupPhase.propTypes = {
  order: PropTypes.object.isRequired,
};

export default BetGroupPhase;
