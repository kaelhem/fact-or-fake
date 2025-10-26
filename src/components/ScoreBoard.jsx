const ScoreBoard = ({ score, currentRound, totalRounds }) => {
  return (
    <div className="score-board">
      <h1>Fact or Fake</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '5px' }}>
        Open Data Edition
      </p>
      <div className="score-info">
        <div className="score-item">
          <div className="score-label">Score</div>
          <div className="score-value">{score}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Round</div>
          <div className="score-value">
            {currentRound + 1}/{totalRounds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
