import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Button,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';

import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  bottomDrawerList: {
    marginTop: 'auto',
  },
  drawerTitle: {
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
    fill: 'white',
  },
  toolbarTitle: {
    color: 'white',
    marginRight: 'auto',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
  },
}));

const DesktopHeader = ({ navData }) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    handleUserClose();
  };

  const classes = useStyles();
  return (
    <Toolbar>
      <Link
        className={classes.toolbarTitle}
        variant="h6"
        noWrap
        href="/"
        underline="none"
      >
        Polla Proyecta
      </Link>
      <nav>
        {navData.map(({ label, href }) => (
          <Button
            key={label}
            color="inherit"
            to={href}
            component={Link}
            className={classes.link}
          >
            {label}
          </Button>
        ))}
      </nav>

      {loading || !user ? (
        <Button
          href="/sign-in"
          color="secondary"
          variant="outlined"
          className={classes.link}
        >
          Iniciar Sesión
        </Button>
      ) : (
        <>
          <Button
            color="secondary"
            className={classes.link}
            onClick={handleUserClick}
          >
            Bienvenide, {user.displayName}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleUserClose}
          >
            <MenuItem onClick={handleUserClose}>Mi perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
};

DesktopHeader.propTypes = {
  navData: PropTypes.array,
};
export default DesktopHeader;
