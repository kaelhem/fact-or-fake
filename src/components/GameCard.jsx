import { useState, useEffect } from 'react';

const GameCard = ({ fact, onAnswer }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Trigger fade in animation when fact changes
    setAnimationClass('');
    setTimeout(() => setAnimationClass('fadeIn'), 10);
  }, [fact]);

  return (
    <div className={`game-card ${animationClass}`}>
      <div>
        <p className="fact-text">{fact?.text}</p>
      </div>

      <div className="buttons-container">
        <button
          className="game-button fact-button"
          onClick={() => onAnswer(true)}
        >
          Fact
        </button>
        <button
          className="game-button fake-button"
          onClick={() => onAnswer(false)}
        >
          Fake
        </button>
      </div>
    </div>
  );
};

export default GameCard;
