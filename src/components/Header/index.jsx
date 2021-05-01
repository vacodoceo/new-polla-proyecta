import { AppBar, Button, Link, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
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

  return (
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
        <Button
          href="/sign-in"
          color="secondary"
          variant="outlined"
          className={classes.link}
        >
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
