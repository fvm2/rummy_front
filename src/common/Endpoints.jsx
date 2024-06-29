import { useState } from "react";
import axios from "axios";

function procesarJson(input) {
  let str = input.replace(/(\w+):/g, '"$1":'); // Convertir las claves en strings
  return JSON.parse(str);
}

function Endpoints() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const partidasCrear = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/crear`, {
        user_id: input
      });
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const partidasUnirse = async () => {
    try {
      let obj = procesarJson(input);
      console.log(obj);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/unirse`, obj);
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const partidasEmpezar = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/empezar`, obj);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const cartasRepartir = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/repartir`, obj);
      setResponse(JSON.stringify(data, null, 2));
     } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const robarCarta = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/robar`, obj);
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const obtenerCartas = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/obtener`, obj);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const validarTurno = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/turnos/validar`, obj);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  const cambiarTurno = async () => {
    try {
      let obj = procesarJson(input);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/turnos/cambiar`, obj);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }


  return (
    <div>
      <h1>Endpoints</h1>
      <p>Aquí puedes probar los Endpoints a la API del Backend</p>
      <ul>
        <li>
          <strong>POST partidas/crear</strong> - Crear una partida, recibe el usuario.id que la crea <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="1"/>
          <button onClick={partidasCrear}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST partidas/unirse</strong> - Unirse a una partida, recibe el usuario.id y el game.id <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{user_id: 1, game_id: 1}"/>
          <button onClick={partidasUnirse}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST partidas/empezar</strong> - Para empezar una partida, recibe el usuario.id que quiere empezar la partida y el game.id de la partida<br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 1, user_id: 1}"/>
          <button onClick={partidasEmpezar}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST cartas/repartir</strong> - Repartir cartas a los jugadores de una partida. <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 1}"/>
          <button onClick={cartasRepartir}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST cartas/robar</strong> - Robar carta si es el turno del jugador. <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 1, player_id: 1}}"/>
          <button onClick={robarCarta}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST cartas/obtener</strong> - Ver las cartas del mazo del juego. <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 3}"/>
          <button onClick={obtenerCartas}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST turnos/validar</strong> - Ver si es el turno del jugador. <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 3, player_id: 1}"/>
          <button onClick={validarTurno}>Enviar</button>
          <pre>{response}</pre>
        </li>
        <li>
          <strong>POST turnos/cambiar</strong> - Cambia el turno de la partida. <br />
          <input type="text" value={input} onChange={handleInputChange} placeholder="{game_id: 3}"/>
          <button onClick={cambiarTurno}>Enviar</button>
          <pre>{response}</pre>
        </li>
      </ul>
    </div>
  );
}

export default Endpoints;