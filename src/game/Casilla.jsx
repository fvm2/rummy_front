import './Casilla.css';

export default function Casilla({ id, onClick, isSelected, onDrop }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    onDrop(id, cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div 
      className={`casilla ${isSelected ? 'selected' : ''}`} 
      id={id} 
      onClick={() => onClick(id)} 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
    >
    </div>
  );
}
