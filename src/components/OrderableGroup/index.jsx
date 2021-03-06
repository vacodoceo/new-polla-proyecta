import PropTypes from 'prop-types';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { labels } from '../../utils/countries';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    display: 'flex',
  },
  standing: {
    height: theme.spacing(7),
  },
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
});

const OrderableGroup = ({ title, id, order, handleChange, draggable }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(order, result.source.index, result.destination.index);

    handleChange(id, items);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List
        subheader={
          <ListSubheader component="div" disableSticky>
            #
          </ListSubheader>
        }
      >
        {order.map((_, index) => (
          <ListItem key={index} className={classes.standing}>
            <ListItemText primary={index + 1 + '°'} />
          </ListItem>
        ))}
      </List>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable) => (
            <List
              subheader={
                <ListSubheader component="div" disableSticky>
                  {title}
                </ListSubheader>
              }
              ref={providedDroppable.innerRef}
              style={{ flex: 1 }}
            >
              {order.map((countryValue, index) => (
                <Draggable
                  key={countryValue}
                  draggableId={countryValue}
                  isDragDisabled={!draggable}
                  index={index}
                >
                  {(providedDraggable, snapshot) => (
                    <ListItem
                      ContainerComponent="li"
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        providedDraggable.draggableProps.style
                      )}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={countryValue}
                          src={`${process.env.PUBLIC_URL}/images/${countryValue}.png`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={labels[countryValue]} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {providedDroppable.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

OrderableGroup.propTypes = {
  order: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  draggable: PropTypes.bool,
};

OrderableGroup.defaultProps = {
  draggable: true,
};

export default OrderableGroup;
