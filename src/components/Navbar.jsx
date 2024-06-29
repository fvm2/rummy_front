import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import '../styles/Navbar.css';
import axios from "axios";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  // queremos que cambie el navbar cuando cambia el token, ya que significa login/logout
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try{
        if (token) {
          const response = await axios({
              method: 'get',
              url: `${import.meta.env.VITE_BACKEND_URL}/scopes-ejemplo/protecteduser`,
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          console.log(response.data.user);
          console.log(response);
          setUser(true);
        } else {
        setUser(false);
        }
      }
      catch(error){
        setUser(false);
        console.log("Error", error);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    //setLoading(true);
    logout();
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/instructions">Instrucciones</Link></li>

        {user ? (
          <>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
          </>
        ) : (
        <>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/register">Crear Cuenta</Link></li>
        </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;