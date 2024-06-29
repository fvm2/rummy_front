import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <button type="button" onClick={handleClick}>
      Volver a Inicio
    </button>
  );
}

export default HomeButton;