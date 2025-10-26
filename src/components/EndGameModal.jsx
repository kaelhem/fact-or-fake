const EndGameModal = ({ score, totalRounds, onPlayAgain }) => {
  const accuracy = Math.round((score / totalRounds) * 100);

  const getMessage = () => {
    if (accuracy === 100) return 'Perfect! You\'re a data expert!';
    if (accuracy >= 80) return 'Excellent! Great job!';
    if (accuracy >= 60) return 'Good work! Keep practicing!';
    if (accuracy >= 40) return 'Not bad! Try again to improve!';
    return 'Better luck next time!';
  };

  return (
    <div className="end-game-modal">
      <div className="end-game-content">
        <h2 className="end-game-title">Game Over!</h2>

        <div className="final-score">
          {score} / {totalRounds}
        </div>

        <p className="accuracy">
          Accuracy: {accuracy}%
        </p>

        <p style={{ fontSize: '1.2rem', color: '#667eea', marginBottom: '30px' }}>
          {getMessage()}
        </p>

        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndGameModal;
