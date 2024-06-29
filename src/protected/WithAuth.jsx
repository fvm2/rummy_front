import React from 'react';
import { Navigate } from 'react-router-dom';

export function withAuth(Component) {
    return function WrappedComponent(props) {
        const token = localStorage.getItem("token");
        ///const navigate = useNavigate();
        if (!token) {
            return <Navigate to="/login" />; // Redirige al usuario a la página de inicio de sesión si no está autenticado
          }
        // Si hay un token, renderiza el componente que se pasó
        return <Component {...props} />;
    };
}