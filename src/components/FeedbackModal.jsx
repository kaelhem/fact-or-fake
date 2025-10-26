const FeedbackModal = ({ isCorrect, fact, onNext }) => {
  return (
    <div className="feedback-modal">
      <div className="feedback-content">
        <div className="feedback-icon">
          {isCorrect ? '✅' : '❌'}
        </div>

        <h2 className={`feedback-title ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Wrong!'}
        </h2>

        <p className="feedback-message">
          {isCorrect
            ? fact.isTrue
              ? 'Well done! This is a real fact from open data.'
              : 'Great job! You spotted the fake data.'
            : fact.isTrue
            ? 'Oops! This was actually a real fact.'
            : 'This was fake data, you got tricked!'}
        </p>

        <div className="feedback-source">
          <p>
            <strong>Source:</strong> {fact.source}
          </p>
          {fact.realValue && (
            <p style={{ marginTop: '8px' }}>
              <strong>Real value:</strong> {fact.realValue}
            </p>
          )}
          {fact.context && (
            <p style={{ marginTop: '8px' }}>
              <strong>Context:</strong> {fact.context}
            </p>
          )}
          {!fact.isTrue && fact.originalFact && (
            <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#999' }}>
              <strong>Original fact:</strong> {fact.originalFact}
            </p>
          )}
        </div>

        <button className="next-button" onClick={onNext}>
          Next Round
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
