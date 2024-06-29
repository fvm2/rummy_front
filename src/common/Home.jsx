import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido a NotRummy!</h1>
      <p>El juego de cartas que no es Rummy pero dice serlo.</p>
      {/*<button><Link to="/endpoints">Testear Endpoints</Link></button>*/}
      <button><Link to="/gamesList">Jugar</Link></button>
      <button><Link to="/faq">FAQ</Link></button>
    </div>
  );
}

export default Home;