import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with 💙 by{' '}
      <Link
        color="inherit"
        href="https://github.com/vacodoceo"
        style={{ textDecoration: 'underline' }}
      >
        @vacodoceo
      </Link>{' '}
      and
      <Link
        color="inherit"
        href="https://github.com/jiruiz2"
        style={{ textDecoration: 'underline' }}
      >
        @jiruiz2
      </Link>{' '}
      for Proyecta
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" component="p">
        ¡Visítanos también en Instagram{' '}
        <Link
          color="inherit"
          href="https://www.instagram.com/proyectauc/?hl=es-la"
          style={{ textDecoration: 'underline' }}
        >
          @proyectauc
        </Link>
        !
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
