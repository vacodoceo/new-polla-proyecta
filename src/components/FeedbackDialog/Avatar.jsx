import PropTypes from 'prop-types';
import { Avatar as MuiAvatar, makeStyles } from '@material-ui/core';
import { Done as DoneIcon, Error as ErrorIcon } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  avatar: {
    alignSelf: 'center',
    height: theme.spacing(10),
    marginTop: theme.spacing(3),
    width: theme.spacing(10),
  },

  icon: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
}));

const Avatar = ({ status }) => {
  const classes = useStyles();

  const Icon = (props) => {
    if (status === 'error') {
      return <ErrorIcon {...props} />;
    }
    return <DoneIcon {...props} />;
  };

  const background = status === 'error' ? red['A700'] : green['A700'];

  return (
    <MuiAvatar className={classes.avatar} style={{ background }}>
      <Icon className={classes.icon} />
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  status: PropTypes.string,
};

export default Avatar;
