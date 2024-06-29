import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';


const GameInfo = ({ gameId }) => {
  const [gameData, setGameData] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);

  const navigate = useNavigate();
  
  let token = localStorage.getItem("token");

  function gameStatus(status) {
    if (status === 0) {
      return "En espera";
    } else if (status === 1) {
      return "Iniciada";
    }
    return "Finalizada";
  }

  const checkIfPlayerIsInGame = async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${userId}/jugadores/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log('Players:', response.data);
  
    const players = response.data;
    console.log(gameId)
    console.log("la respuesta del server es", players)
    console.log("el userId es", players.user_id)

    return players.some(player => String(player.user_id) === String(userId));
  }


  
  const joinGame = async () => {

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    const isPlayerInGame = await checkIfPlayerIsInGame(userId);
    
    if (isPlayerInGame) {
      console.log(`El user ${userId} ya está en la partida.`);
      //log de status partida
      console.log('Status partida:', gameData.partida.status);  

      if (gameData.partida.status == 0){
          navigate(`/waitingRoom/${gameId}`);
        }
      else if (gameData.partida.status == 1){
          navigate(`/games/${gameId}`);
        }

      else{
          console.log('Partida finalizada');  
          navigate(`/`);
      }
    } else{
      // Si el jugador no está en la partida, haz la solicitud para unirse a la partida
      try {
        console.log('Unirse a la partida:', gameId);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/unirse`, {
          game_id: gameId,
          user_id: userId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en los headers de la solicitud
          },
        });

        if (response.status === 200) {
          //history.push(`/partidas/${gameId}`);
          alert(`Te has unido a la partida ${gameId}.`);
          setPlayerCount(prevCount => prevCount + 1);
          navigate (`/waitingRoom/${gameId}`);
        } else {
          alert('No se pudo unir a la partida.');
        }
      } catch (error) {
        console.error('Error al unirse a la partida:', error);
        alert('No se pudo unir a la partida.');
      }
  }};

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/info/${gameId}`);
        setGameData(response.data);
        setPlayerCount(response.data.n_jugadores);
      } catch (error) {
        console.error('Error al obtener los datos de la partida:', error);
      }
    };

    fetchGameData();
  }, [gameId, playerCount]);

  if (!gameData) {
    return <div>Cargando...</div>;
  }

  let gameInfo = gameData.partida;

  // hacer log de Token: token
  //console.log('Token: ', token);

  if ( token === "null") {
    //console.log('Token es null string: ', token);
    token = null;
  }

  return (
      <div>
      <h2>Partida {gameId}</h2>
      <p>Estado partida: {gameStatus(gameInfo.status)}</p>
      <p>Número de jugadores: {gameData.n_jugadores}</p>
      {token && (gameInfo.status === 0 || gameInfo.status === 1) && (
      <button onClick={joinGame}>Unirse a la partida</button>
    )}
      </div>
  );
  

};

GameInfo.propTypes = {
    gameId: PropTypes.number.isRequired,
};

export default GameInfo;