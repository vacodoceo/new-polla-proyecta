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
      <Link color="inherit" href="https://github.com/vacodoceo">
        @vacodoceo
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
        ¡Visítanos también en nuestras redes sociales!
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
