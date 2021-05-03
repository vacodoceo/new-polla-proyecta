import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  avatar: {
    alignSelf: 'center',
    background: green['A700'],
    height: theme.spacing(10),
    marginTop: theme.spacing(3),
    width: theme.spacing(10),
  },
  contentText: {
    '& em': {
      fontStyle: 'normal',
      fontWeight: 600,
    },
  },
  icon: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  title: {
    textAlign: 'center',
  },
}));

const FeedbackDialog = ({ preferenceId, dialogOpen }) => {
  const history = useHistory();

  const classes = useStyles();
  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby="feedback-dialog-title"
      onClose={() => history.push('/')}
    >
      <Avatar className={classes.avatar}>
        <DoneIcon className={classes.icon} />
      </Avatar>
      <DialogTitle id="feedback-dialog-title" className={classes.title}>
        ¡Polla creada!
      </DialogTitle>

      <DialogContent>
        <DialogContentText className={classes.contentText}>
          Tu polla ya está registrada, pero recuerda que{' '}
          <em>debes pagarla para que empiece a participar</em>. Para ir a pagar
          solo debes pulsar el botón de abajo, o bien hacerlo desde el menú de{' '}
          <em>Mis Pollas.</em>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          component={Link}
          to={`/payment/${preferenceId}`}
          variant="contained"
          color="primary"
        >
          Ir a pagar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FeedbackDialog.propTypes = {
  preferenceId: PropTypes.string,
  dialogOpen: PropTypes.bool,
};

export default FeedbackDialog;
