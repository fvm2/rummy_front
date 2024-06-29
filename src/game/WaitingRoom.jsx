import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WaitingRoom.css';

function WaitingRoom() {
  const [gameInfo, setGameInfo] = useState(null);
  const { gameId } = useParams();
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

  const startGame = async () => {
    try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        console.log('Empezar partida:', gameId);
        console.log('User:', userId);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/empezar`, { game_id: Number(gameId), user_id: Number(userId) });
        if (response.status === 200) {
            navigate(`/games/${gameId}`);
        } else {
            alert('Error al iniciar la partida');
        }
        } catch (error) {
        console.error('Error al iniciar la partida:', error.response.data);
        alert(error.response.data);
        }
  };

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/salaEspera/${gameId}`);
        setGameInfo(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener la información del juego:', error);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  if (!gameInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="waiting-room">
      <h1> Sala de Espera Partida {gameId}</h1>
      <h2 className="game-status">Estado: {gameStatus(gameInfo.partida.status)}</h2>
      <h2>Jugadores:</h2>
      <div className="players-container">
        {gameInfo.info_jugadores.map((jugador, index) => (
          <div key={index} className="player">
            <p>Jugador {jugador.n_jugador}: {jugador.username}</p>
            <p>Victorias: {jugador.wins}</p>
            <p>Partidas jugadas: {jugador.played_matches}</p>
          </div>
          ))}
      </div>
      <button onClick={startGame}>Iniciar Partida</button>
    </div>
  );
}

export default WaitingRoom;