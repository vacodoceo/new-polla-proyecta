import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';

import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  authLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  form: {
    width: '100%',
  },
  googleButton: {
    width: 'auto !important',
    margin: theme.spacing(2),

    '& span': {
      padding: theme.spacing(0, 2),
    },
  },
  paper: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyItems: 'center',
    paddingTop: theme.spacing(2),
    gap: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    paddingTop: theme.spacing(8),
  },
}));

const SignIn = () => {
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const classes = useStyles();
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.title}
      >
        👋 ¡Bienvenide! 👋
      </Typography>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <GoogleButton
            onClick={handleGoogleLogin}
            label="Inicia sesión con Google"
            className={classes.googleButton}
          />

          <Typography variant="body2" color="textSecondary">
            O si prefieres el camino largo...
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
            <div className={classes.authLinks}>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
              <Link href="/sign-up" variant="body2">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
