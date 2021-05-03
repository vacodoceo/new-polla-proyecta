import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  buttonProgress: {
    marginLeft: theme.spacing(1),
  },
}));

const CreatePollaDialog = ({ dialogOpen, handleClose, createPolla }) => {
  const [pollaName, setPollaName] = useState('');
  const [pollaNameError, setPollaNameError] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handlePollaNameChange = (e) => {
    setPollaName(e.target.value);
    if (!_.isEmpty(pollaName)) {
      setPollaNameError();
    }
  };

  const submit = async () => {
    if (_.isEmpty(pollaName)) {
      setPollaNameError('¡Debes ponerle un nombre a tu polla!');
    } else {
      setSubmitting(true);
      await createPolla(pollaName);
      setSubmitting(false);
    }
  };

  const classes = useStyles();

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        ¡Dale un nombre a tu polla!
      </DialogTitle>
      <form autoComplete="off">
        <DialogContent>
          <DialogContentText color="textPrimary">
            Como último paso queremos pedirte que le des un nombre a tu polla
            😄. Puede ser lo que tu quieras, pero ten en cuenta que si tu polla
            llega a ser de las mejores, aparecerá su nombre en el Ranking de
            Pollas 🏆.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="polla-name"
            label="Nombre de tu polla"
            type="polla-name"
            error={pollaNameError}
            helperText={pollaNameError}
            fullWidth
            onChange={handlePollaNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submit}
            color="primary"
            variant="contained"
            disabled={submitting}
          >
            Crear polla
          </Button>
        </DialogActions>
      </form>

      <Backdrop className={classes.backdrop} open={submitting}>
        <CircularProgress />
      </Backdrop>
    </Dialog>
  );
};

CreatePollaDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  createPolla: PropTypes.func,
};

export default CreatePollaDialog;
