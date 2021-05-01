import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  AppBar,
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  ExitToApp as LogOutIcon,
  PhotoCamera as CameraIcon,
} from '@material-ui/icons';

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

const Header = () => {
  const classes = useStyles();
  const [user, loading] = useAuthState(firebase.auth());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    firebase.auth().signOut();
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
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
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              ¿Quienes somos?
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              Preguntas Frecuentes
            </Link>
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
            <Button
              onClick={() => setDrawerOpen(true)}
              color="secondary"
              className={classes.link}
            >
              Mi Perfil
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          subheader={
            <ListSubheader component="span" id="drawer-header">
              Perfil de {user?.displayName}
            </ListSubheader>
          }
        >
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <CameraIcon /> : <CameraIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List className={classes.bottomDrawerList}>
          <ListItem button key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
