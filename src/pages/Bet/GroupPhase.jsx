import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import OrderableGroup from '../../components/OrderableGroup';

import { groups } from '../../utils/countries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    width: 'clamp(240px, 100%, 720px)',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
}));

const BetGroupPhase = ({ defaultOrder, handleGroupOrderChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrderableGroup
        title="Grupo A"
        id="A"
        defaultOrder={defaultOrder.A}
        options={groups.A}
        handleGroupOrderChange={handleGroupOrderChange}
      />
      <OrderableGroup
        title="Grupo B"
        id="B"
        defaultOrder={defaultOrder.B}
        options={groups.B}
        handleGroupOrderChange={handleGroupOrderChange}
      />
    </div>
  );
};

BetGroupPhase.propTypes = {
  defaultOrder: PropTypes.object.required,
  handleGroupOrderChange: PropTypes.func.required,
};

export default BetGroupPhase;
