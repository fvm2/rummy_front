# BMVTech_frontend

## Rummy ##

### Descripción del juego:

El Rummy es un juego de cartas el cual se juega de a 4 personas. El objetivo de este es formar trios de cartas del mismo número o escalas de la misma pinta, e ir dejandolas en las casillas. El juego termina cuando un jugador logra bajar todas sus cartas. Cuenta con otras funcionalidades como cartas especiales, las cuales otorgan poderes que pueden beneficiar al jugador, junto a una tienda para su adquicision. Estas tienen un precio en puntaje el cual se va ganando a medida que el jugador baje cartas. 

### Funcionalidad general de la aplicacion:

## Landing Page
- Barra de navegacion, la cual contiene boton de inicio, iniciar sesión, crear cuenta, acerca de nosotros, intrucciones del juego.
- Boton para testear endpoints, para ver si estan funcionando correctamente.
- Boton para jugar (sin implementar el juego como tal todavia).
- Boton de preguntas frecuentes (FAQ).

## Iniciar Sesión
- Formulario para iniciar sesión donde se pide el correo y la contraseña.
- Boton para iniciar sesión.
- Boton para registrarse en caso de no tener cuenta.

## Crear Cuenta
- Formulario para crear cuenta donde se pide el nombre, correo, contraseña y confirmacion de contraseña.
- Boton para registrarse.
- Boton para iniciar sesión en caso de ya tener cuenta creada.

## Nosotros
- Información sobre el equipo de desarrollo.

## Instrucciones
- Instrucciones sobre como jugar el juego. Leerlas antes de emepzar a jugar.

## Jugar
- Cuando se presiona el boton de jugar, se llega a una pantalla con una lista de las partidas creadas (si es que hay alguna), y un boton para crear una nueva partida. Cuenta con una opccion para unirse a una partida que aun no comienza, y si ya estabas dentro de una partida, puedes volver a unirte.

## Sala de espera
- En esta pantalla se muestra el nombre de los jugadores que se unieron a la partida, y un boton para comenzar la partida. Solamente el creador de la partida puede comenzarla, una vez esten los 4 jugadores dentro de la sala.

## Partida
- En esta pantalla se muestra el tablero de juego, las cartas de cada jugador (tanto normales como especiales si es que tiene), una tienda para comprar cartas especiales, un formulario que se usa cuando el jugador utilizará un joker, y un interfaz de resumen que muestra los puntos que tienes junto al turno actual de la partida. Tambien cuenta con botones para robar cartas, bajar cartas, comprar cartas especiales y terminar turno. Las cartas se seleccionan con un click, y se pueden deseleccionar con otro click, al igual que las casillas.

### Modelos

## Game 
`Game(status: INTEGER, deck: STRING, turn: INTEGER, playing_time: INTEGER, initial_cards: INTEGER, shop: STRING)`
Relaciones: 
- `has_many :players, foreignKey: 'game_id'`
- `has_many :squares, foreignKey: 'game_id'`

## NormalCard 
`NormalCard(number: INTEGER, color: STRING, joker: BOOLEAN, image: STRING)`

## SpecialCard
`SpecialCard(name: STRING, description: STRING, image: STRING)`

## Player
`Player(number: INTEGER, points: INTEGER, has_played: BOOLEAN, normal_cards: STRING, special_cards: STRING, game_id: INTEGER, user_id: INTEGER)`
Relaciones: 
- `belongsTo :games, foreignKey: 'game_id'`
- `belongsTo :users, foreignKey: 'user_id'`

## Square
`Square(number: INTEGER, cards: STRING, special_card: STRING, game_id: INTEGER, player_id: INTEGER)`
Relaciones: 
- `belongsTo :games, foreignKey: 'game_id'`
- `hasOne :players, foreignKey: 'id'`

## User
`User(mail: STRING, username: STRING, password: STRING, wins: INTEGER, played_matches: INTEGER)`
Relaciones:
- `has_many :players, foreignKey: 'user_id'`

### Lógica GET/POST, conexión con la API
- Para el inicio de sesion y registro se utilizan dos rutas de POST, se trabaja con un token que se asigna a cada usuario, y las contraseñas se encriptan con BCRYPT. 
- Para obtener la informacion necesaria del usuario se utilizan GET, como puede ser obtener los jugadores de una partida o el id.
- Para la crear, unirse, empezar partidas de partidas se utiliza un POST. Al crear una partida, se crea un player para el usuario, al igual que cuando se une a una partida. Cuando esta empieza, se crea un tablero de juego, y se asignan las cartas a los jugadores. 
- Los turnos se validan a traves de un POST, y se actualiza el tablero de juego con las cartas que se bajaron, lo mismo para cuando cambia el turno.
- Para la tienda se utiliza un POST para comprar cartas especiales, y se actualiza el juego con las cartas que se compraron.
- Las funcionalidades de juego, como bajar cartas, robar cartas, se realizan a traves de un POST, y se actualiza el juego con las cartas que se bajaron o robaron.

### Funciones importantes
- `robarCarta`: Se encarga de robar una carta del mazo y asignarla al jugador que la robo. Recibe el id del jugador con el game_id. Las cartas se envian en un diccionario de la forma {id_carta: imagen}.
- `bajarCarta`: Se encarga de bajar una carta del jugador al tablero de juego. Recibe el id del jugador, las cartas en un array, la casilla seleccionada, y las especificaciones de la carta joker si es que es requerido. Se hacen las verificaciones necesarias para ver si la carta se puede bajar, es decir, que sea un trio o escala valida, que si es la primera vez que se baja un jugador sea en una casilla vacia y sean 3 cartas, entre otras. Para esto se utilizan dos funciones adicionales:  `esMovimientoValido ` y  `isValidSquareMove`. Además, se le suman los puntos correspondientes al jugador. La logica para el caso de los jokers, es que si se quiere usar este, se debe declarar antes de bajar las cartas, por lo que el joker pasa a ser una simulacion de tal carta, y es tratada con las caracteristicas de esa misma carta declarada.
- `usarCartaEspecial`: Se encarga de usar una carta especial, y asignarle el poder correspondiente al jugador. Recibe el id del jugador, el nombre de la carta especial. Se verifica que el jugador tenga la carta especial, y dependiendo del tipo de carta, se ejecuta su funcion.
- `comprarCartaEspecial`: Se encarga de comprar una carta especial, y asignarla al jugador. Recibe el id del jugador, el nombre de la carta especial. Se verifica que el jugador tenga los puntos necesarios para comprar la carta, y se le restan los puntos correspondientes.
- `cambiarTurno`: Se encarga de cambiar el turno de la partida. Recibe el id del jugador y actualiza el tablero de juego con el turno siguiente.
- `validarTurno`: Se encarga de validar el turno de la partida. Recibe el id del jugador y verifica que sea su turno.
- `crearPartida`: Se encarga de crear una partida. Recibe el id del usuario y crea una partida, el estado inicial se setea en 0, que significa que esta esperando jugadores. 
- `unirsePartida`: Se encarga de unirse a una partida. Recibe el id del usuario y crea un jugador que se agrega a la partida.
- `empezarPartida`: Se encarga de empezar una partida. Recibe el id del jugador, que debe ser el mismo quien creo la partida y cambia el estado de la partida a empezada, el cual se setea en 1, que significa que ya empezó. Se crea el tablero con `crearTablero`, el mazo `crearMazo`, y se reparten las cartas a los jugadores `repartirCartas`.


