import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function UserCheck() {
    const {token} = useContext(AuthContext);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        console.log(token);
        axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/scopes-ejemplo/protecteduser`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response.data.user)
            setStatus(response.data.message)
          })
          .catch(error => {
            setStatus(error.message);
          });
      }, [token]);

    return (
        <div className="UserCheck">
            <h1> Página de usuario protegida </h1>
            <p> Esta es una página protegida, solo puedes verla si estás logueado. </p>
            <p> {status} </p>
        </div>
    );
}

export default UserCheck;