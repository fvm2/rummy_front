// Este es el componente Router de las cápsulas.

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './common/Home';
import Login from './user/Login';
import Register from './user/Register';
import About from './common/About';
import Instructions from './common/Instructions';
import Endpoints from './common/Endpoints';
import Game from './game/Game';
import FAQ from './common/FAQ';
import LogoutButton from './user/Logout';
import UserCheck from './protected/UserCheck';
import Profile from './user/Profile';
import GameList from './game/GamesList';
import WaitingRoom from './game/WaitingRoom';

// no me funcionó, la idea es proteger la ruta/ componente para que no se pueda acceder a través de la URL
//import { withAuth } from './protected/WithAuth';
//const ProtectedProfile = withAuth(Profile);


function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/endpoints" element={<Endpoints />} />
          <Route path="/gamesList" element={<GameList />} />
          <Route path="/waitingRoom/:gameId" element={<WaitingRoom />} />
          <Route path="/games/:gameId" element={<Game />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/usercheck" element={<UserCheck />} />
          <Route path="/profile"  element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
