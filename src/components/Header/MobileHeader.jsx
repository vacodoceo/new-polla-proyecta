/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ExitToApp as SignOutIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Person as UserIcon,
} from '@material-ui/icons';

import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(5),
    },
  },
  bottomListItem: {
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
}));

const MobileHeader = ({ navData }) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = () => {
    firebase.auth().signOut();
    setDrawerOpen(false);
  };

  const LinkListItem = ({
    href = '',
    icon: Icon,
    label,
    onClick,
    className,
  }) => (
    <ListItem
      button
      component={Link}
      to={href}
      onClick={onClick ?? (() => setDrawerOpen(false))}
      className={className}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  const classes = useStyles();
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Typography
        className={classes.toolbarTitle}
        variant="h6"
        noWrap
        href="/"
        underline="none"
      >
        Polla Proyecta
      </Typography>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className={classes.drawer}
      >
        <List>
          {loading || !user ? (
            <LinkListItem
              href="/sign-in"
              icon={UserIcon}
              label="Iniciar sesión"
            />
          ) : (
            <LinkListItem href="/profile" icon={UserIcon} label="Mi perfil" />
          )}
        </List>
        <Divider />
        <List>
          <LinkListItem href="/" icon={HomeIcon} label="Inicio" />
          {navData.map(({ label, href, icon }) => (
            <LinkListItem href={href} icon={icon} label={label} key={href} />
          ))}
        </List>

        {user && (
          <LinkListItem
            key="sign-out"
            icon={SignOutIcon}
            label="Cerrar sesión"
            onClick={handleSignOut}
            className={classes.bottomListItem}
          />
        )}
      </Drawer>
    </Toolbar>
  );
};

MobileHeader.propTypes = {
  navData: PropTypes.array,
};

export default MobileHeader;
