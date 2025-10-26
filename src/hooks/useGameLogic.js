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
      const allFacts = await fetchRealFacts();

      // Shuffle all available facts
      const shuffledPool = [...allFacts].sort(() => Math.random() - 0.5);

      const gameFacts = [];
      const usedTexts = new Set(); // Track used fact texts to prevent duplicates

      // Select 10 unique facts (5 real, 5 fake)
      let realCount = 0;
      let fakeCount = 0;

      for (let i = 0; i < shuffledPool.length && gameFacts.length < TOTAL_ROUNDS; i++) {
        const fact = shuffledPool[i];

        // Skip if we've already used this fact text
        if (usedTexts.has(fact.text)) {
          continue;
        }

        // Add real fact if we need more
        if (realCount < 5) {
          gameFacts.push({ ...fact, isTrue: true });
          usedTexts.add(fact.text);
          realCount++;
        }

        // Generate and add fake fact if we need more
        if (fakeCount < 5 && i + 1 < shuffledPool.length) {
          const sourceFact = shuffledPool[i + 1];
          if (!usedTexts.has(sourceFact.text)) {
            const fakeFact = generateFakeFact(sourceFact);

            // Make sure the fake is actually different from the original
            if (fakeFact.text !== sourceFact.text && !usedTexts.has(fakeFact.text)) {
              gameFacts.push(fakeFact);
              usedTexts.add(sourceFact.text); // Mark source as used
              usedTexts.add(fakeFact.text);   // Mark fake as used
              fakeCount++;
            }
          }
        }
      }

      // Final shuffle of the game facts
      const finalFacts = gameFacts.sort(() => Math.random() - 0.5);

      setGameState({
        currentRound: 0,
        score: 0,
        facts: finalFacts,
        currentFact: finalFacts[0],
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
