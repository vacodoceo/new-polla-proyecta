import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Link,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import GoogleButton from 'react-google-button';
import { red } from '@material-ui/core/colors';

import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    marginTop: theme.spacing(2),
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
  snackbar: {
    background: red[500],
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    paddingTop: theme.spacing(8),
  },
}));

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(firebase.auth());
  const [snackbarMessage, setSnackbarMessage] = useState();

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem('displayName', `${name} ${lastName}`);
    createUserWithEmailAndPassword(email, password);
  };

  const handleGoogleRegister = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const classes = useStyles();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage()}
        message={snackbarMessage}
        ContentProps={{ className: classes.snackbar }}
      />

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
            onClick={handleGoogleRegister}
            label="Regístrate con Google"
            className={classes.googleButton}
          />

          <Typography variant="body2" color="textSecondary">
            O si prefieres el camino largo...
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarme
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="sign-in" variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
