import './Carta.css';

export default function Store({imgSrc, id, onClick, isSelected}) {
    const precios = {
        'Dog': 4000,
        'Magician': 6000
    };
    const precio = precios[id];
    return (
        <div 
        className={`carta ${isSelected ? 'selected' : ''}`} 
        onClick={onClick} 
        draggable
        >
            <div className="carta-special-container">
                <img src={imgSrc} alt={id} className='img' id='id'/>
            </div>
            {precio && <div className="precio-carta">{id}: ${precio}</div>}
        </div>
    );
}