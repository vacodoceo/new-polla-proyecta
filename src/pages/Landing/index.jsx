import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import thirdPlaceImage from '../../assets/images/thirdPlace.png';
import secondPlaceImage from '../../assets/images/secondPlace.png';
import firstPlaceImage from '../../assets/images/firstPlace.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
    fill: 'white',
  },

  biggerPrizeImage: {
    maxWidth: '80%',
    maxHeight: '160px',
  },

  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  headerTitle: {
    color: 'white',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  price: {
    fontWeight: 500,
  },
  priceWrapper: {
    flexGrow: 1,
    margin: theme.spacing(1, 2),
  },
  pricing: {
    margin: theme.spacing(4, 0, 0),
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
  },
  pricingGrid: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '900px',
    margin: 'auto',
    flexWrap: 'wrap',
  },
  prizeCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  prizeImage: {
    maxWidth: '80%',
    maxHeight: '120px',
  },
}));

const tiers = [
  {
    title: 'Segundo lugar',
    price: 20000,
    image: secondPlaceImage,
  },
  {
    title: 'Primer lugar',
    price: 30000,
    image: firstPlaceImage,
  },
  {
    title: 'Tercer lugar',
    price: 10000,
    image: thirdPlaceImage,
  },
];

const Landing = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            La Gran Pollamérica
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Un sitio en el que podrás ganar premios apostando por los resultados
            de la Copa América, al mismo tiempo que estarás ayudando a disminuir
            la pobreza multidimensional en Chile.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/bet" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    ¡Apuesta ya!
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  ¿Por qué debería participar?
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.prizeCardContent}>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price.toLocaleString('de-DE')}
                    </Typography>
                  </div>
                  <img
                    src={tier.image}
                    className={
                      tier.title === 'Primer lugar'
                        ? classes.biggerPrizeImage
                        : classes.prizeImage
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className={classes.pricing}>
        <Typography
          variant="h4"
          color="secondary"
          align="center"
          className={classes.price}
        >
          Precios
        </Typography>
        <div className={classes.pricingGrid}>
          <div className={classes.priceWrapper}>
            <Typography
              color="secondary"
              variant="h3"
              className={classes.price}
              align="center"
            >
              $2.500
            </Typography>
            <Typography color="secondary" variant="h6" align="center">
              de 2 a 6 pollas
            </Typography>
          </div>
          <div className={classes.priceWrapper}>
            <Typography
              color="secondary"
              variant="h2"
              className={classes.price}
              align="center"
            >
              $2.000
            </Typography>
            <Typography color="secondary" variant="h6" align="center">
              por 7 o más pollas
            </Typography>
          </div>

          <div className={classes.priceWrapper}>
            <Typography
              color="secondary"
              variant="h3"
              className={classes.price}
              align="center"
            >
              $3.000
            </Typography>
            <Typography color="secondary" variant="h6" align="center">
              por 1 polla
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
