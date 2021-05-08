import { makeStyles, Paper, Typography } from '@material-ui/core';

const instructionsSteps = {
  'Fase de Grupos':
    'Debes ingresar los resultados de la fase de grupo, para ello debes agarrar y arrastrar los equipos de cada grupo hasta que queden en el orden que creas.',
  'Cuartos de Final':
    'Después en la pestaña de Cuartos de Final, para el primer y cuarto encuentro, debes seleccionar cuales serán los dos mejores terceros de los grupos A, B y C. Posteriormente debes ingresar los goles del tiempo reglamentario para cada partido, en caso que apuestes por un empate deberás marcar en el cuadrado correspondiente qué equipo crees que pasará de ronda.',
  Semifinal:
    'Una vez ingresado todos los resultados de los Cuartos de Final se habilitará la pestaña de la Semifinal, donde deberás seleccionar los goles del tiempo reglamentario para cada semifinal, en caso que apuestes por un empate deberás marcar en el cuadrado correspondiente qué equipo crees que pasará de ronda.',
  Final:
    'Finalmente se habilitará la pestaña Final donde podrás ingresar los resultados de la final y el partido por el tercer lugar. En caso que apuestes un empate deberás marcar en el cuadrado correspondiente qué equipo crees que pasará de ronda.',
  '¿Quedaste con dudas?':
    'Revisa nuestras preguntas frecuentes o nuestras bases y reglas.',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    background: 'white',
    padding: theme.spacing(2),
    maxWidth: '120ch',
    display: 'grid',
    gap: theme.spacing(2),
  },
}));

const BetInstructions = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {Object.entries(instructionsSteps).map(([title, description]) => (
        <div key={title}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      ))}
    </Paper>
  );
};

export default BetInstructions;
