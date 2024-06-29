import '../styles/Instructions.css';

function Instructions() {
  return (
    <div id="instrucciones">
      <h1 id="ih1">Instrucciones del Juego</h1>
      <p>Nuestro juego NotRummy es un desafío de cartas similar al carioca, que consiste en bajar tríos y escalas 
        hasta que una persona se quede sin cartas. Uno puede bajarse una cantidad indefinida de veces, siempre y cuando
        se cumplan ciertas condiciones. Se juega con dos barajas inglesas, con comodines y cartas especiales.
      </p>

      <h2>Reglas</h2>
      <ul>
        <li>En un turno el jugador puede, bajar cartas, comprar carta especial, usar carta especial, o sacar carta, en este ultimo caso, el turno termina automaticamente,
          en los otros, el jugador debe apretar el boton para terminar turno.</li>
        <li>Para bajarse, hay ciertas condiciones </li>
        <ol> 
          <li>Un trío tiene que tener todas los numeros iguales</li>
          <li>Una escalera tiene que tener todas las cartas de la misma pinta</li>
          <li>No puede haber más de un joker en una jugada. Además el jugador debe especificar la carta a la cual el joker hace referencia,
            esto no puede cambiar una vez hecho.
          </li>
          <li>Deben haber 4 jugadores en la partida para poder iniciar, solo el que creo la partida puede empezarla</li>
          <li>Se debe seleccionar las cartas y la casilla antes de apretar el boton para bajar cartas</li>
        </ol>
        <li>El jugador puede añadir cartas a grupos en la mesa, solo si ya se ha bajado al menos una vez, independiente sean suyos o no.</li>
      </ul>

      <h2>Puntuación</h2>
      <ul>
        <li>El juego termina cuando un jugador se queda sin cartas.</li>
        <li>Por cada carta bajada, se suman 1000 puntos al jugador, los cuales sirven para comprar cartas en tienda.</li>
      </ul>

      <h2>Cartas Especiales</h2>
      <p>Se encuentran distintas cartas especiales las cuales tienen algún poder especial.</p>

      <h3>Las cartas especiales que se pueden comprar son las siguientes:</h3>
        <ul>
          <li><strong>Carta Perro:</strong> implica sacar 4 cartas del montón y se las deja a alguno de los contrincantes.</li>
          <li><strong>Carta Mago:</strong> Te añade una carta joker a tu mano.</li>
        </ul>
    <p>Un jugador puede comprar maximo 1 carta especial a la vez, y puede tener maximo 1 carta especial por tipo en su mano.</p>
    <p>Las cartas especiales no cuentan como cartas como tal para ganar el juego, es decir, un jugador puede ganar si ya no le quedan más cartas normales, pero nunca usó las especiales que tenía.</p>
    

    </div>
  );
}

export default Instructions;