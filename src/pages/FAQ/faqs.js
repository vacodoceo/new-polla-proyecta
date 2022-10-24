import { Typography } from '@material-ui/core';

const faqs = [
  {
    title: '¿Cómo apostar?',
    body: (
      <Typography>
        Para apostar solo debes registrate, clickear el botón de{' '}
        <em>¡Apuesta ya!</em> en la página de inicio y seleccionar los
        resultados para cade fase de la copa. Una vez hayas hecho esto, tendrás
        que pagar tu polla desde el menú de <em>Mis pollas</em>, úlitimo paso
        para que tu polla ya esté participando.
      </Typography>
    ),
  },
  {
    title: '¿Cómo funciona la puntuación?',
    body: (
      <Typography>
        A cada polla por separado se le asignará su puntaje correspondiente
        según los resultados de los partidos. Después todas las pollas se
        ordenarán según puntaje de mayor a menor. El puntaje de cada polla
        corresponde a la suma del puntaje asignado por la fase de grupos y la
        fase de eliminación directa.
      </Typography>
    ),
  },
  {
    title: '¿Cómo se asigna el puntaje?',
    body: (
      <Typography>
        En la fase de grupos se asignará 5 puntos por cada posición correcta de
        un equipo en la tabla de su grupo. En fases eliminatorias se asignará 5
        puntos por acertar al ganador del encuentro o al empate si corresponde.
        Además se sumarán 2 puntos por acertar al número de goles de un equipo y
        1 punto por acertar a la diferencia de goles del partido.
      </Typography>
    ),
  },
  {
    title: '¿Cómo funciona el pago?',
    body: (
      <Typography>
        El pago de una o varias pollas, se realizará a través de esta misma
        página a través de <em>Mercado Pago</em> una vez hayas terminado tu
        polla o bien desde el menú <em>Mis pollas</em>, donde se te redirigirá a
        una página donde podrás realizarlo.
      </Typography>
    ),
  },
  {
    title: '¿Hasta qué día puedo apostar?',
    body: (
      <Typography>
        Será posible participar hasta el día anterior a que inicie la Copa
        América, es decir, se podrá comprar hasta el 19 de Noviembre a las 23:59
      </Typography>
    ),
  },
  {
    title:
      '¿Qué períodos del partido se consideran para el cómputo de los goles?',
    body: (
      <Typography>
        La predicción solo incluye los 90 minutos de tiempo reglamentario más
        los descuentos dados por el árbitro y los tiempos extra en caso de
        empate en los primeros 2 tiempos, pero excluye el resultado de las
        series de penaltis.
      </Typography>
    ),
  },
  {
    title: '¿Qué ocurre si quiero apostar a  empate de un partido?',
    body: (
      <Typography>
        En caso que quieras apostar a un empate debes seleccionar la cantidad de
        goles de cada equipo y marcar la casilla del equipo que crees que pasará
        de ronda.
      </Typography>
    ),
  },
  {
    title:
      '¿Cómo sé que mis apuestas ya están participando dentro del concurso?',
    body: (
      <Typography>
        Si en la página de <em>Mis pollas</em>, en la tabla de tus pollas tu
        apuesta figura como <em>Pagada</em>, tu apuesta ya está participando.
      </Typography>
    ),
  },
  {
    title: '¿Cómo funciona el ranking?',
    body: (
      <Typography>
        A cada polla por separado se le asignará un puntaje correspondiente
        según los resultados de los partidos. Después de esto, todas las pollas
        se ordenarán de mayor a menor según su puntaje asociado acumulado.
      </Typography>
    ),
  },

  {
    title: '¿Qué sucede en caso de empate en el primer lugar?',
    body: (
      <Typography>
        En el caso de que dos personas empaten con el mayor puntaje en el
        ranking final, se tomarán los montos del primer y segundo lugar y se
        repartirán entre ambos ganadores. Mientras la persona que esté en el
        siguiente puesto en el ranking recibirá el premio del tercer lugar. En
        caso de que exista un empate entre tres o más personas con el mayor
        puntaje en el ranking final, se tomarán los montos del primer, segundo y
        tercer lugar y se repartirán equitativamente entre la cantidad de
        ganadores
      </Typography>
    ),
  },
  {
    title: '¿Qué sucede en caso de empate en el segundo lugar?',
    body: (
      <Typography>
        En el caso de que dos o más personas empaten con la segunda posición en
        el ranking final, se tomarán los premios del segundo y tercer lugar y se
        repartirán los ganadores.
      </Typography>
    ),
  },
  {
    title: '¿Qué sucede en caso de empate en el tercer lugar?',
    body: (
      <Typography>
        En el caso de que dos o más personas empaten con la tercera posición en
        el ranking final, se tomará el premio del tercer lugar y se repartirá
        equitativamente entre los ganadores.
      </Typography>
    ),
  },
  {
    title: '¿Cómo cobro mi premio?',
    body: (
      <Typography>
        Una vez que haya finalizado el Mundial Qatar 2022, la organización se
        contactará con los ganadores por correo para gestionar la entrega de su
        premio.
      </Typography>
    ),
  },
  {
    title:
      '¿Por qué el pago está asociado a la cuenta de Marcela Céspedes? ¿Quién es Marcela Céspedes?',
    body: (
      <Typography>
        Proyecta es un voluntariado que pertenece a la Facultad de Ingeniería de
        la Pontificia Universidad Católica de Chile, por lo que no posee
        personalidad jurídica, lo que conlleva a que no sea posible tener una
        cuenta bancaria asociada a la organización. Es por este motivo que los
        ingresos asociados a los pagos de las apuestas se deben realizar a una
        cuenta particular. Marcela Céspedes es una de los tres jefes generales de
        Proyecta, por lo que el pago de todas las apuestas de la polla se
        redirigen a su cuenta para que el dinero ingrese directamente a la
        organización.
      </Typography>
    ),
  },
];

export default faqs;
