import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { MonetizationOn as MoneyIcon } from '@material-ui/icons';
import { lightBlue } from '@material-ui/core/colors';
import CountUp from 'react-countup';

import firebase from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import landingBackground from '../../assets/images/landing.jpg';
import { getPrizes, prizeCssData } from '../../helpers/prizes_helper';
import { PRIZES_INTERVALS } from '../../constants/prizes';
 
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
    marginTop: theme.spacing(1),
    maxWidth: '80%',
    maxHeight: '120px',
  },
  bountyChip: {
    margin: theme.spacing(0, 'auto', 2),
    padding: theme.spacing(2),
    height: 'fit-content',
    width: 'fit-content',
    fontSize: '30px',
    fontWeight: 'bold'
  },
  cardHeader: {
    backgroundColor: lightBlue[100],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      content: "' '",
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      opacity: 0.4,
      backgroundImage: `url(${landingBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
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
    background: 'white',
  },
  prizeImage: {
    marginTop: theme.spacing(1),
    maxWidth: '80%',
    maxHeight: '80px',
  },
  bountyContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  prizeIntervalContent: {
    fontSize: '15px',
    margin: 'auto',
    width: 'fit-content',
    padding: theme.spacing(2)
  },
  prizeInterval: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(0),
    width: '4em',
    marginLeft: theme.spacing(0),
    padding: theme.spacing(0)
  },
  priceIntervalContainer: {
    padding: theme.spacing(0),
    display: 'flex'
  },
  betContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  }
}));

const Landing = () => {
  const classes = useStyles();
  const [bounty, setBounty] = useState(0);
  const [prizes, setPrizes] = useState([]);
  // const [pollasData] = useCollectionData(
  //   firebase.firestore().collection('pollas').where('status', '==', 'paid')
  // );
  const pollasData = [{ price: 0}]

  useEffect(() => {
    if (pollasData) {
      const newBounty = pollasData.reduce(
        (prev, polla) => prev + (polla.price ?? 0),
        0
      );
      setBounty(newBounty);

      const prizesCssData = prizeCssData(classes)
      const prizesData = getPrizes(newBounty, prizesCssData)
      setPrizes(prizesData)
    }
  }, [pollasData]);

  return (
    <>
      <div className={classes.heroContent}>
        <Container
          maxWidth="sm"
          style={{
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            style={{ fontWeight: 400 }}
            gutterBottom
          >
            La Gran Polla Mundialista
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            style={{ color: 'rgba(0, 0, 0, .93)' }}
          >
            Un sitio en el que podrás ganar premios apostando por los resultados
            del Mundial, al mismo tiempo que estarás ayudando a disminuir
            la pobreza multidimensional en Chile.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/ranking" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Ranking
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/about-us"
                  variant="contained"
                  color="secondary"
                >
                  ¿Por qué debería participar?
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={classes.betContainer}>
        <Link to="/bet">
          <Button variant="contained" color="primary">
            ¡Apuesta ya!
          </Button>
        </Link>
      </div>
      <div className={classes.bountyContainer}>
        <Chip
            color="primary"
            icon={<MoneyIcon />}
            className={classes.bountyChip}
            label={
              <div>
                Monto recaudado: $<CountUp end={bounty} separator="." />
              </div>
            }
          />
      </div>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {prizes.map((prize) => (
            <Grid item key={prize.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={prize.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.prizeCardContent}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    ${prize.amount.toLocaleString('de-DE')}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" align="center">
                    {prize.extra}
                  </Typography>

                  <img
                    src={prize.image}
                    className={prize.className}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {PRIZES_INTERVALS.map((prizePlace, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card>
                <CardContent className={classes.prizeIntervalContent}>
                  {prizePlace.map((interval) => (
                    <Container key={interval.max} className={classes.priceIntervalContainer}>
                      <Container key={interval.max} className={classes.prizeInterval}>
                        {`> ${interval.min}`}
                      </Container>
                      {`${interval.amount} ${interval.extra}`}
                    </Container>
                  ))}
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
              $2.250
            </Typography>
            <Typography color="secondary" variant="h6" align="center">
              de 4 a 8 pollas
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
              por 9 o más pollas
            </Typography>
          </div>

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
              por 1 a 3 pollas
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
