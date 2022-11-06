import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';

import AboutUsImage from '../../assets/images/aboutUs.jpeg';
import MisionImage from '../../assets/icons/mision.png'
import VisionImage from '../../assets/icons/vision.png'


const useStyles = makeStyles((theme) => ({
  media: {
    height: '320px',
    maxHeight: '40vh',
  },
  root: {
    marginTop: theme.spacing(2),
  },
  extraData: {
    display: 'flex',
    paddingLeft: theme.spacing(0)
  },
  icon: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(0),
    width: '1em',
    height: '1em'
  }
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={AboutUsImage}
          title="Voluntarios en terreno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ¿Qué es Proyecta?
          </Typography>
          <Typography variant="body1" component="p" align="justify">
            Proyecta es un voluntariado social abierto a todas las universidades, que busca disminuir la pobreza multidimensional existente en diferentes zonas rurales y urbanas del país. Para lograr esto se realizan construcciones de espacios comunitarios y talleres que buscan unir a los habitantes de las zonas visitadas. Actualmente, Proyecta se financia mediante la realización de distintas actividades gracias a la colaboración de sus voluntarios, por lo que la realización de esta polla surge de la necesidad existente de llevar a cabo los Trabajos de Verano 2023. ¡Te invitamos a colaborar con nosotros a través de esta entretenida Polla Mundial Qatar 2022, y de paso estarás ayudando a todas las familias que buscamos beneficiar con nuestros trabajos durante el año! Si quieres saber más de Proyecta y nuestras actividades, puedes buscarnos en nuestro Instagram{' '}
            <Link
              color="inherit"
              href="https://www.instagram.com/proyectauc/?hl=es-la"
              style={{ fontWeight: 'bold' }}
            >
              @proyectauc
            </Link>
          </Typography>
          <Container maxWidth="md" className={classes.extraData}>
            <Container maxWidth="md" className={classes.root}>
              <Typography gutterBottom variant="h5" component="h2">
                <Container maxWidth="md" className={classes.extraData}>
                  <img src={MisionImage} className={classes.icon}/>
                  Misión
                </Container>
              </Typography>
              <Typography variant="body1" component="p" align="justify">
                Generar espacios de encuentro a través de construcciones comunitarias, la realización de talleres y actividades formativas.
              </Typography>
            </Container>
            <Container maxWidth="md" className={classes.root}>
              <Typography gutterBottom variant="h5" component="h2">
                <Container maxWidth="md" className={classes.extraData}>
                  <img src={VisionImage} className={classes.icon}/>
                  Visión
                </Container>
              </Typography>
              <Typography variant="body1" component="p" align="justify" >
                Disminuir la pobreza multidimensional, generando instancias en que se puedan promover redes, oportunidades, motivación y expectativas en comunidades de Chile.
              </Typography>
            </Container>
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutUs;
