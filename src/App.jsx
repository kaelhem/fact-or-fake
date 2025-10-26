import { useGameLogic } from './hooks/useGameLogic';
import ScoreBoard from './components/ScoreBoard';
import GameCard from './components/GameCard';
import FeedbackModal from './components/FeedbackModal';
import EndGameModal from './components/EndGameModal';
import './App.css';

function App() {
  const { gameState, handleAnswer, nextRound, resetGame, totalRounds } = useGameLogic();

  if (gameState.loading) {
    return (
      <div className="app">
        <div className="game-card">
          <div className="loading">Loading open data facts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ScoreBoard
        score={gameState.score}
        currentRound={gameState.currentRound}
        totalRounds={totalRounds}
      />

      <GameCard
        fact={gameState.currentFact}
        onAnswer={handleAnswer}
      />

      {gameState.showFeedback && (
        <FeedbackModal
          isCorrect={gameState.isCorrect}
          fact={gameState.currentFact}
          onNext={nextRound}
        />
      )}

      {gameState.gameEnded && (
        <EndGameModal
          score={gameState.score}
          totalRounds={totalRounds}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
}

export default App;
