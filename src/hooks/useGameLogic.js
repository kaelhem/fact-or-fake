import { useState, useEffect } from 'react';
import { fetchRealFacts, generateFakeFact } from '../utils/dataFetcher';

const TOTAL_ROUNDS = 10;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState({
    currentRound: 0,
    score: 0,
    facts: [],
    currentFact: null,
    showFeedback: false,
    isCorrect: false,
    gameEnded: false,
    loading: true,
  });

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    setGameState(prev => ({ ...prev, loading: true }));

    try {
      const realFacts = await fetchRealFacts();
      const gameFacts = [];

      // Create a mix of 50% real and 50% fake facts
      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        if (i % 2 === 0 && realFacts.length > 0) {
          // Add a real fact
          const randomIndex = Math.floor(Math.random() * realFacts.length);
          gameFacts.push(realFacts[randomIndex]);
        } else if (realFacts.length > 0) {
          // Generate a fake fact from a real one
          const randomIndex = Math.floor(Math.random() * realFacts.length);
          const fakeFact = generateFakeFact(realFacts[randomIndex]);
          gameFacts.push(fakeFact);
        }
      }

      // Shuffle the facts
      const shuffledFacts = gameFacts.sort(() => Math.random() - 0.5);

      setGameState({
        currentRound: 0,
        score: 0,
        facts: shuffledFacts,
        currentFact: shuffledFacts[0],
        showFeedback: false,
        isCorrect: false,
        gameEnded: false,
        loading: false,
      });
    } catch (error) {
      console.error('Error initializing game:', error);
      setGameState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleAnswer = (userAnswer) => {
    const { currentFact, score, currentRound } = gameState;

    // userAnswer: true for Fact, false for Fake
    const isCorrect = userAnswer === currentFact.isTrue;

    setGameState(prev => ({
      ...prev,
      showFeedback: true,
      isCorrect,
      score: isCorrect ? score + 1 : score,
    }));
  };

  const nextRound = () => {
    const { currentRound, facts } = gameState;
    const nextRound = currentRound + 1;

    if (nextRound >= TOTAL_ROUNDS) {
      // Game ended
      setGameState(prev => ({
        ...prev,
        gameEnded: true,
        showFeedback: false,
      }));
    } else {
      // Move to next fact
      setGameState(prev => ({
        ...prev,
        currentRound: nextRound,
        currentFact: facts[nextRound],
        showFeedback: false,
        isCorrect: false,
      }));
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return {
    gameState,
    handleAnswer,
    nextRound,
    resetGame,
    totalRounds: TOTAL_ROUNDS,
  };
};
