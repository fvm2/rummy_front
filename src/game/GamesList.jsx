import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameInfo from './GameInfo';
import '../styles/Instructions.css';

import HomeButton from './botonPrueba';

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const GameList = () => {
  const [gameIds, setGameIds] = useState([]);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  if (token === "null") {
    token = null;
  }

  const createGame = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
    

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/crear`, {
            user_id: userId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });// falta el tema del token que no se está pidiendo, pero creo que debería
        
      const gameId = response.data.game_id;
      setGameIds(prevIds => [...prevIds, gameId]);
      // navigate to the game
      navigate(`/waitingRoom/${gameId}`);
    } catch (error) {
      console.error('Error al crear la partida:', error);
    }
  }

  useEffect(() => {
    const fetchGameIds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/ids`);
        const ids = response.data.map(game => game.id);
        setGameIds(ids);
      } catch (error) {
        console.error('Error al obtener los ids de las partidas:', error);
      }
    };

    fetchGameIds();
  }, []);

  return (
    <div id="instrucciones">
        <h1>Lista de partidas</h1>
        { token && (
        <button onClick={createGame}>Crear partida</button>
        )}
      {gameIds.map(gameId => (
        <GameInfo key={gameId} gameId={gameId} />
      ))}
      {/* acá quiero usar el homebutton */}
      <HomeButton />
    </div>
  );
};

export default GameList;