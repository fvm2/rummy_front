// React
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Axios
import axios from 'axios';

// Componentes
import Casilla from './Casilla';
import Carta from './Carta';
import { jwtDecode } from 'jwt-decode';
import JokerForm from './JokerForm';

// Estilos
import './Game.css';
import Store from './Store';
import CartaEspecial from './CartaEspecial';

export default function Game() {
  const [gameInfo, setGameInfo] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const { gameId } = useParams();
  const token = localStorage.getItem("token");
  const [cartas, setCartas] = useState({});
  const [cartasEspeciales, setCartasEspeciales] = useState({});
  const [joker, setJoker] = useState({ number: '', suit: '' });
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCasilla, setSelectedCasilla] = useState(null);
  const [casillas, setCasillas] = useState({});
  // [PR REVIEW] Hooks agregados por Nico en GameStore
  const [cartasTienda, setCartasTienda] = useState({});
  const [selectedStoreCard, setSelectedStoreCard] = useState([]);
  // const [cartasEspeciales, setCartasEspeciales] = useState({});
  const [selectedSpecialCard, setSelectedSpecialCard] = useState([]);
  // [PR REVIEW] Hooks agregados por Felipe en CambiosFelipe
  // useStates del dashboard del juego
  const [turno, setTurno] = useState(null);
  //const [score, setScore] = useState({});
  const [emailsCartas, setEmailsCartas] = useState([]);
  const [score, setScore] = useState(0);
  const [cartasEnCasilla, setCartasEnCasilla] = useState({});

  // update cada 10s
  const [gameStatus, setGameStatus] = useState(0);

  const toggleCardSelection = (id) => {
    setSelectedCards(prev => 
        prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const toggleSpecialCardSelection = (id) => {
    setSelectedSpecialCard(prev => 
        prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const toggleStoreCardSelection = (id) => {
    setSelectedStoreCard(prev => 
        prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
    console.log(selectedStoreCard)
  };

  const comprarCarta = async () => {
    console.log("Se quiere comprar una carta", selectedStoreCard)
    if (!selectedStoreCard.length) {
      console.error('No se han seleccionado cartas.');
      alert('Por favor, selecciona al menos una carta antes de comprar.');
      return; 
    }
    if (selectedStoreCard.length > 1) {
      console.error('No se pueden seleccionar más de una carta.');
      alert('Por favor, selecciona solo una carta.');
      return; 
    }
    if (cartasEspeciales[selectedStoreCard]) {
      console.error("Ya tienes esta carta especial");
      alert("Ya tienes esta carta especial");
      return;
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/comprar`, {
        player_id: playerId, 
        cardType: selectedStoreCard
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      const newSepecialCards = data.dicc
      const newPoints = data.points
      setScore(newPoints);

      setCartasEspeciales(prevCartas => ({
        ...prevCartas,
        ...newSepecialCards
      }));   
      console.log('Cartas finales:', cartasEspeciales);
      setSelectedStoreCard([]);
    } catch(error){
      console.error('Error al comprar las cartas:', error);
      alert('Error al comprar las cartas, asegurate de tener suficientes puntos y que sea tu turno.');
      return
   }
  }
  // Para las Casillas:
  const handleCasillaClick = (id) => {
    setSelectedCasilla(prev => prev === id ? null : id);
  };

  const handleDropCardInCasilla = (casillaId, cardId) => {
    setCasillas(prev => ({
      ...prev,
      [casillaId]: cardId
    }));
  };

  // Resto código


  const clearSelection = () => {
    setSelectedCards([]);
    setJoker({ number: '', suit: '' });
  };

  const handleCardClick = (cardId) => {
    console.log(`Carta clicada: ${cardId}`);
    // Aquí puedes añadir más lógica, como abrir un modal, cambiar estado, etc.
  };

  const handleJokerChange = (number, suit) => {
      setJoker({ number, suit });
      console.log(`Joker configurado como: ${number} de ${suit}`);
  };

  useEffect(() => {
    const fetchCartasCasilla = async () => {
    console.log(selectedCasilla);
    if (!selectedCasilla) {
      console.log("no hay casilla seleccionada")
      setCartasEnCasilla({})
      return;
    }
    try { 
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/cartascasilla`, {
      square_number: selectedCasilla,
      gameId: gameId
      }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const respuesta = response.data
    console.log(respuesta)
    if (Object.keys(respuesta).length > 0) {
      setCartasEnCasilla(respuesta)
    }
  } catch (error) {
    console.error('Error al obtener las cartas de la casilla:', error);
  }
  }; fetchCartasCasilla();
  }, [selectedCasilla]);

  const submitCards = async () => {

    if (!selectedCards.length) {
      console.error('No se han seleccionado cartas.');
      alert('Por favor, selecciona al menos una carta antes de bajar.');
      return; // Detiene la ejecución si no hay cartas seleccionadas
    }
  
    // Verificar que una casilla está seleccionada
    if (!selectedCasilla) {
      console.error('No se ha seleccionado una casilla.');
      alert('Por favor, selecciona una casilla antes de bajar las cartas.');
      return; // Detiene la ejecución si no hay una casilla seleccionada
    }

    const intGameId = parseInt(gameId, 10);
    const intPlayerId = parseInt(playerId, 10);
    const intSelectedCasilla = parseInt(selectedCasilla, 10);
    const intSelectedCards = selectedCards.map(cardId => parseInt(cardId, 10));
    const jokerNumber = parseInt(joker.number, 10);
    const jokerSuit = joker.suit;

    const payload = {
      intGameId,
      intPlayerId,
      intSelectedCards,
      joker,
      intSelectedCasilla
    };

    console.log("Enviando al backend:", payload);
    try{
      console.log(cartas)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/bajar`, {
        player_id: intPlayerId, 
        card_ids: intSelectedCards, 
        square_number: intSelectedCasilla, 
        joker_card: { number: jokerNumber, suit: jokerSuit }
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      const newCards = data.dicc
      const newPoints = data.points
      setScore(newPoints);
      setCartas(newCards);
      setSelectedCards([]);
      setJoker({ number: '', suit: '' });
      setSelectedCasilla(null);
    } catch(error){
      console.error('Error al bajar las cartas:', error);
      alert('Error al bajar las cartas, asegurate de elegir un patron correcto, una casilla disponible y que sea tu turno.');
      return
    }
  };

  const passTurn = async () => {
    try
    {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/turnos/cambiar`, {
        gameId: gameId,
        playerId: playerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newTurno = response.data;
      //console.log('Nuevo turno:', newTurno)
      alert('Es el turno del siguiente jugador.');
      setTurno(newTurno);

    } catch(error){
      console.error('Error al pasar el turno:', error);
      alert('Error al pasar el turno, asegurate de que sea tu turno para poder pasarlo.');
      return
    }
  };

  const requestCard = async () => {
    try {
        // Asegúrate de que la URL del backend está correctamente configurada
        console.log('Solicitando carta...', playerId, gameId);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/robar`, {
            player_id: playerId,
            game_id: gameId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const newCards = response.data;
        setCartas(newCards)


    } catch (error) {
        console.error('Error al sacar carta, asegurate de que sea tu turno:', error);
        alert('Error al sacar carta, asegurate de que sea tu turno.');
        return
    }
  };
  useEffect(() => {
    console.log("El largo actualizado de cartas es: ", Object.keys(cartas).length);
    console.log("Las cartas actuales son: ", cartas);
    // if (Object.keys(cartas).length === 0) {
    //   alert('Has ganado la partida');
    // }
}, [cartas]); // Este useEffect se ejecuta cada vez que 'cartas' cambia.

  useEffect(() => {
    const fetchPlayerId = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/get-player-id`, {
          userId: userId,
          gameId: gameId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }}
      );
        setPlayerId(response.data.playerId);
        
      }
      catch (error) {
        console.error('Error fetching player ID:', error);
      }
    };
    fetchPlayerId();
  }, [token, gameId]);

  useEffect(() => {
    const fetchCartasTienda = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cartas/imagenesstore`);
        setCartasTienda(response.data);
        console.log("las cartas de la tienda son", cartasTienda)
      } catch (error) {
        console.error('Error al obtener las cartas de la tienda:', error);
      }
    };
    fetchCartasTienda();
  }, []);
  
  useEffect(() => {
    const fetchCartasEspeciales = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/imagenesespeciales`, {
          playerId: playerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }}
        );
        setCartasEspeciales(response.data);
        console.log("las cartas especiales son", cartasEspeciales)
      } catch (error) {
        console.error('Error al obtener las cartas especiales:', error);
      }
    }; fetchCartasEspeciales();}, [playerId, token]);

  useEffect(() => {
    const fetchCartas = async () => {
      try {
        console.log("el player id es: ", playerId)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/imagenes`, {
          playerId: playerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }}
      );
        setCartas(response.data);
      }
      catch (error) {
        console.error('Error fetching cartas:', error);
      }
    }; fetchCartas();}, [playerId, token]);


    const useSpecialCard = async () => {
      try {
        console.log(selectedSpecialCard)
        if (!selectedSpecialCard.length) {
          console.error('No se han seleccionado cartas.');
          alert('Por favor, selecciona al menos una carta antes de usar.');
          return; 
        }

        if (selectedSpecialCard.length > 1) {
          console.error('No se pueden seleccionar más de una carta.');
          alert('Por favor, selecciona solo una carta.');
          return; 
        }
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/usarpoder`, {
          player_id: playerId, 
          special_card_power: selectedSpecialCard
          }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const datos = response.data;
        const newSepecialCards = datos.dicc_special;
        const newCards = datos.dicc_normal;
        setCartasEspeciales(newSepecialCards);
        if (Object.keys(newCards).length > 0){ 
        setCartas(newCards);
      }
        console.log('Cartas finales:', cartasEspeciales);
        setSelectedSpecialCard([]);
    } catch(error){
      console.error('Error al usar carta especial:', error);
      alert('Error al usar carta especial, asegurate de seleccionar una y que sea tu turno.');
      return
    }}
    


  // useEffect(() => {
  //   const fetchCartasEspeciales = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cartas/imagenesEspeciales`, {
  //         playerId: playerId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }}
  //     );
  //       setCartasEspeciales(response.data);
  //     }
  //     catch (error) {
  //       console.error('Error fetching cartas especiales:', error);
  //     }
  //   }; fetchCartasEspeciales();}, [playerId, token]);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/info/${gameId}`);
        setGameInfo(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener la información del juego:', error);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  useEffect(() => {
    const fetchTurnoActual = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/turnoActual`, {
          gameId: gameId  // Enviar gameId en el cuerpo de la solicitud
        } /*, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }*/);  // Intenta sin el token primero
        setTurno(response.data.turno);
      } catch (error) {
        console.error('Error al obtener el turno actual:', error);
      }
    };
    fetchTurnoActual();
  }, [gameId]);  // Asegúrate de que esto se ejecuta después de que gameId esté disponible

  useEffect(() => {
    const fetchEmailsCartas = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/emailsCartas`, {
          gameId: gameId  // Enviar gameId en el cuerpo de la solicitud
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmailsCartas(response.data);
      } catch (error) {
        console.error('Error fetching emails and cartas:', error);
      }
    };
    fetchEmailsCartas();
  }, [gameId, token]);
  
useEffect(() => {
  const fetchPuntosPlayer = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/puntos`, {
        playerId: playerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setScore(response.data);
    } catch (error) {
      console.error('Error fetching puntos:', error);
    }
  };
  fetchPuntosPlayer();
}, [gameId, token]);



  // update game  every 10 seconds
  useEffect(() => {
    const updateGameStatus = () => {
      setGameStatus(prev => prev + 1);
      //console.log("Actualizando estado del juego...", gameStatus);
    };
    updateGameStatus(); 
    const intervalId = setInterval(updateGameStatus, 10000); // Actualizar estado cada 10 segundos

    return () => clearInterval(intervalId); // Limpieza al desmontar
  }, []);
  

  if (!gameInfo) {
    return <div>Cargando...</div>;
  }

  // Casillas
  // En el back el atributo number de el "id" de la casilla (del 1 al 36)
  const renderGrid = () => {
    const grid = [];
    for (let i = 1; i <= 36; i++) {
      //cards = cartasCasilla(i) || [];
      grid.push(
        <Casilla 
          key={i} 
          id={i} 
          onClick={handleCasillaClick} 
          isSelected={selectedCasilla === i} 
          onDrop={handleDropCardInCasilla} 
          />
        );
        //cards={cards}
      }
    return grid;
  };



  // Lo siguiente me está tirando error, por eso lo comento
  // Al probar el endpoint del backend en postman, si me responde bien.
  // http://localhost:3000/partidas/turnoActual
  // body: { "gameId": "1" }
  // return { "turno": "1" }

  /*useEffect(() => {
    const fetchTurnoActual = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/turnoActual`, {
          gameId: gameId  // Enviar gameId en el cuerpo de la solicitud
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTurno(response.data.turno);
      } catch (error) {
        console.error('Error al obtener el turno actual:', error);
      }
    };
    fetchTurnoActual();
  }, [gameId]);
  */

  return (
    <div className='juego'>
      <div className='info-juego'>
        <p>Eres el jugador: {playerId}</p>
        <p>Turno actual: {turno}</p>
        <p>Puntaje: {score}</p>
        {/*{emailsCartas.map((item, index) => (
        <p key={index}>
          {item.email}: {item.normal_cards} cartas
        </p>
      ))}*/}
      {Object.keys(cartasEnCasilla).length > 0 ? (
          Object.keys(cartasEnCasilla).map((id_carta) => {
            return <Carta
              imgSrc={cartasEnCasilla[id_carta]}
              key={id_carta}
              id={id_carta}
            />
          })
        ) : (
          <p>Selecciona una casilla para ver sus cartas.</p>
        )}
      </div>
      <div className='main-content'>
        <div className='top-section'>
          <div className='tablero'>
            {renderGrid()}
          </div>
          <div className='cartas-especiales'>
          {/* [PR REVIEW] Esto es lo que tenía el Nico, lo comento por si acaso.
            {Object.keys(cartasEspeciales).map((id_carta) => {
              return <CartaEspecial imgSrc={cartasEspeciales[id_carta]} key={id_carta} id={id_carta} onClick={() => toggleSpecialCardSelection(id_carta)}  
              isSelected={selectedSpecialCard.includes(id_carta)}/>})
            }
            <button onClick={useSpecialCard}>Usar carta especial</button>
            */}
            {Object.keys(cartasEspeciales).length > 0 ? (
                Object.keys(cartasEspeciales).map((id_carta) => {
                  return <CartaEspecial
                    imgSrc={cartasEspeciales[id_carta]}
                    key={id_carta}
                    id={id_carta}
                    onClick={() => toggleSpecialCardSelection(id_carta)}
                    isSelected={selectedSpecialCard.includes(id_carta)}
                  />
                })
              ) : (
                <p>No tienes cartas especiales. Puedes comprarlas en la tienda.</p>
              )}
              <button onClick={useSpecialCard}>Usar carta especial</button>
          </div>
          <div className='tienda-usuario-container'>
            <div className='tienda'>
            {Object.keys(cartasTienda).map((id_carta) => {
              return <Store imgSrc={cartasTienda[id_carta]} key={id_carta} id={id_carta} onClick={() => toggleStoreCardSelection(id_carta)}
              isSelected={selectedStoreCard.includes(id_carta)} /> })
            }
            <button onClick={comprarCarta}>Comprar carta especial</button>
            </div>
            <div className='usuario-container'>
              <div className='data-joker'>
                <JokerForm joker={joker} onJokerChange={handleJokerChange} />
              </div>
              <div className='usuario'>
                <button onClick={submitCards}>Bajar cartas</button>
                <button onClick={clearSelection}>Eliminar selección</button>
                <button onClick={requestCard}>Sacar carta</button>
                <button onClick={passTurn}>Pasar turno</button>
              </div>
            </div>
          </div>
        </div>
        <div className='cartas-usuario'>
          {Object.keys(cartas).map((id_carta) => {
            return <Carta imgSrc={cartas[id_carta]} key={id_carta} id={id_carta} onClick={() => toggleCardSelection(id_carta)}
            isSelected={selectedCards.includes(id_carta)} /> })}
        </div>
      </div>
    </div>
  );
}