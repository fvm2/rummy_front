import axios from 'axios';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import './Profile.css';
import acesImage from '../assets/aces.png';

function Profile() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const getUser = async () => {
        // id del usuario que está logueado
        const token = localStorage.getItem("token");
        //console.log(token);
        
        try {
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub; // 'sub' es un campo común para el ID del usuario
                //console.log(userId);
    
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/show/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(data);
            }
        } catch (error) {
            setError(true);
            setMsg("Error al obtener los datos del usuario");
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    

    return (
        <div className="profile-container">
            <div className="profile-image">
                <h1>{user.username}</h1>
                <img src={acesImage} alt="Aces" />
            </div>
            <div className="profile-info">
            <p>Username: {user.username}</p>
            <p>Mail: {user.mail}</p>
            <p>Wins: {user.wins}</p>
            <p>Played Matches: {user.played_matches}</p>
            <p>Winrate: {user.wins/user.played_matches || 0}</p>
            </div>
        </div>
    );
}


export default Profile;