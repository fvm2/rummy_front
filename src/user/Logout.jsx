import { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        setMessage('Has cerrado sesión');

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };
    
    return (
        <div>
        <h1>Cerrar sesión</h1>
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <p>{message}</p>
        </div>
    );
}

export default LogoutButton;