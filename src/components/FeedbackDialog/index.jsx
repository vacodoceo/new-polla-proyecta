import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

import Avatar from './Avatar';

const useStyles = makeStyles(() => ({
  contentText: {
    '& em': {
      fontStyle: 'normal',
      fontWeight: 600,
    },
  },

  title: {
    textAlign: 'center',
  },
}));

const FeedbackDialog = ({
  actions: Actions,
  description: Description,
  dialogOpen,
  status,
  title,
  handleClose,
}) => {
  const history = useHistory();

  const classes = useStyles();
  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby="feedback-dialog-title"
      onClose={handleClose || (() => history.push('/'))}
    >
      <Avatar status={status} />
      <DialogTitle id="feedback-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText className={classes.contentText}>
          <Description />
        </DialogContentText>
      </DialogContent>
      <DialogActions>{Actions && <Actions />}</DialogActions>
    </Dialog>
  );
};

FeedbackDialog.propTypes = {
  actions: PropTypes.func,
  dialogOpen: PropTypes.bool,
  title: PropTypes.node,
  description: PropTypes.func,
  status: PropTypes.string,
  handleClose: PropTypes.func,
};

export default FeedbackDialog;
