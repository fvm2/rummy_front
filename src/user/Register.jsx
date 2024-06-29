import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Apretaste el botón de registrarse");

    if (password !== confirmPassword) {
      setError(true);
      setMsg("Las contraseñas no coinciden");
      return;
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      username: username,
      mail: mail,
      password: password
    }).then((response) => {
      console.log(response);
      setError(false);
      setMsg("Registro exitoso");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }).catch((error) => {
      console.error(error);
      setError(true);
      setMsg("Error al registrarse");
    });
  }

  return (
    <div className='Signup'>
      {msg.length > 0 && <div className='succesMsg'> {msg} </div>}
      {error && <div className='errorMsg'> {msg} </div>}
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <label> Username: </label>
        <input 
          type="text"
          placeholder="Elige un nombre de usuario" 
          value={username}
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          required
        /> <br />
        <label> Correo Electrónico: </label>
        <input
          type="email"
          placeholder="Correo Electrónico" 
          value={mail}
          name='mail'
          onChange={(e) => setMail(e.target.value)}
          required
        /> <br />
        <label> Contraseña: </label>
        <input 
          type="password"
          placeholder="Contraseña"
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        <label> Confirmar Contraseña: </label>
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          name='confirmPassword'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit"> Registrarse </button>

        <p> ¿Ya tienes cuenta? <Link to="/login"> Iniciar Sesión </Link> </p>
      </form>
    </div>
  );
}


// Aquí ideal si mandamos a login una vez que se registra el usuario para poder guardar el JWT
export default Register;