import { useState } from 'react';
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
import _ from 'lodash';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
  },
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
});

const OrderableGroup = ({
  title,
  id,
  defaultOrder,
  options,
  handleGroupOrderChange,
}) => {
  const [order, setOrder] = useState(defaultOrder);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(order, result.source.index, result.destination.index);

    handleGroupOrderChange(id, items);
    setOrder(items);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable) => (
            <List
              subheader={<ListSubheader component="div">{title}</ListSubheader>}
              ref={providedDroppable.innerRef}
            >
              {order.map((countryValue, index) => (
                <Draggable
                  key={countryValue}
                  draggableId={countryValue}
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
                      <ListItemText
                        primary={
                          _.find(
                            options,
                            (country) => country.value === countryValue
                          )?.label
                        }
                      />
                    </ListItem>
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

OrderableGroup.propTypes = {
  defaultOrder: PropTypes.array.required,
  handleGroupOrderChange: PropTypes.func.required,
  id: PropTypes.string.required,
  options: PropTypes.array.required,
  title: PropTypes.string,
};

export default OrderableGroup;
