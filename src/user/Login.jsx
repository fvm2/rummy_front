import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Apretaste el botón de iniciar sesión");

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        mail: mail,
        password: password
      }).then((response) => {
        console.log(response);
        setError(false);
        setMsg("Inicio de sesión exitoso");
        // Recibir el token y procesarlo
        const access_token = response.data.access_token;
        localStorage.setItem("token", access_token);
        //localStorage.setItem("user_id", response.data.user_id);
        setToken(access_token);
        console.log("Token: ", access_token);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }). catch((error) => {
        console.error(error);
        setError(true);
        setMsg("Error al iniciar sesión");
      })
    };
  
  return (
    <div className='Login'>
      {msg.length > 0 && <div className='succesMsg'> {msg} </div>}

      {error && <div className='errorMsg'> {msg} </div>}
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label> Correo Electrónico: </label>
        <input 
          type="mail"
          name="mail"
          placeholder="Correo Electrónico"
          value={mail}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        </div>
        <div className="form-group">
        <label> Contraseña: </label>
        <input 
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit"> Iniciar Sesión </button>

        <p> ¿No tienes cuenta? <Link to="/register"> Regístrate </Link> </p>
      </form>
    </div>
  );
}

export default Login;