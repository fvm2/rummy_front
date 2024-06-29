import './JokerForm.css';

function JokerForm({ joker, onJokerChange }) {
    return (
        <form className="joker-form">
            <h2>Ingrese el valor que tomará su comodín (si usa)</h2>
            <div className="form-group">
                <label htmlFor="joker-number">Número</label>
                <input 
                    type="text" 
                    id="joker-number"
                    value={joker.number} 
                    onChange={(e) => onJokerChange(e.target.value, joker.suit)} 
                    placeholder="Ej. 11 para Jotas"
                />
            </div>
            <div className="form-group">
                <label htmlFor="joker-suit">Pinta:</label>
                <select 
                    id="joker-suit" 
                    value={joker.suit} 
                    onChange={(e) => onJokerChange(joker.number, e.target.value)}
                >
                    <option value="">Seleccione una pinta</option>
                    <option value="Hearts">Corazones</option>
                    <option value="Diamonds">Diamantes</option>
                    <option value="Clubs">Tréboles</option>
                    <option value="Spades">Picas</option>
                </select>
            </div>
        </form>
    );
}

export default JokerForm;

