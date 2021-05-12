import { makeStyles, Typography } from '@material-ui/core';

export const instructionsSteps = {
  'Fase de Grupos':
    'Debes ingresar los resultados de la fase de grupo, para ello debes agarrar y arrastrar los equipos de cada grupo hasta que queden en el orden que creas.',
  'Cuartos de Final':
    'Después, en la pestaña de cuartos de final, debes ingresar los goles del tiempo reglamentario para cada partido. En caso que apuestes por un empate deberás marcar en la corona correspondiente qué equipo crees que pasará de ronda.',
  Semifinal:
    'Una vez ingresado todos los resultados de los Cuartos de Final, podrás avanzar a la fase de las Semifinales. Aquí deberás seleccionar los goles del tiempo reglamentario para cada semifinal, en caso que apuestes por un empate deberás marcar la corona correspondiente qué equipo crees que pasará de ronda.',
  Final:
    'Finalmente se habilitará la pestaña Final, donde podrás ingresar los resultados de la final y el partido por el tercer lugar.',
  '¿Quedaste con dudas?':
    'Revisa nuestras preguntas frecuentes o nuestras bases y reglas.',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '120ch',
    display: 'grid',
    gap: theme.spacing(2),
  },
}));

const BetInstructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography variant="h4" align="center">
        Instrucciones 🧐
      </Typography>
      {Object.entries(instructionsSteps).map(([title, description]) => (
        <div key={title}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      ))}
    </div>
  );
};

export default BetInstructions;
