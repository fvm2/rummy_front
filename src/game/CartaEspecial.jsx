import './CartaEspecial.css';  

export default function CartaEspecial({ imgSrc, id, onClick, isSelected }) {
    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', id);
    };

    return (
        <div 
            className={`carta-especial ${isSelected ? 'selected' : ''}`} 
            onClick={onClick} 
            draggable
            onDragStart={handleDragStart}
        >
            <div className="carta-special-container">
                <img src={imgSrc} alt={id} className='img' />
            </div>
        </div>
    );
}
