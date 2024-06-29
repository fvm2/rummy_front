import Casilla from "./Casilla";
import "./Casillas.css"

export default function Casillas() {
    return (
        <div className="casillas">
            <div className="casillas-fila">
                {/* Importar todas las casillas */}
                <Casilla />
            </div>

            <div className="casillas-fila">
            </div>

            <div className="casillas-fila">
            </div>

            <div className="casillas-fila">
            </div>

            <div className="casillas-fila">
            </div>
        </div>
    );
}