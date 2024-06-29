import './Carta.css';

export default function Carta({imgSrc, id, onClick, isSelected}) {
    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', id);
    };

    return (
        <div 
        className={`carta ${isSelected ? 'selected' : ''}`} 
        onClick={onClick} 
        draggable
        onDragStart={handleDragStart}
        >
            <div className="carta-container">
                <img src={imgSrc} alt={id} className='img' id='id'/>
            </div>
        </div>
    );
}