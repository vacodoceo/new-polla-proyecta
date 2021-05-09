import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import OrderableGroup from '../../components/OrderableGroup';

import { groups } from '../../utils/countries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 240px))',
    width: '100%',
    justifyContent: 'center',
    gap: theme.spacing(4),
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
