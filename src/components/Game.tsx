import React, { useEffect, useState } from 'react';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import './Game.css';

const generateRandomCard = () => Math.floor(Math.random() * 13) + 1;
const apiUrl = "http://localhost:5193";

const Game: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(generateRandomCard());
  const [nextCard, setNextCard] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    console.log(score);
    fetch(`${apiUrl}/Game`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        points: score,
      })
    })
  }, [score]);

  const handleGuess = (guess: 'higher' | 'lower') => {
    const newCard = generateRandomCard();
    
    if (
      (guess === 'higher' && newCard > currentCard) ||
      (guess === 'lower' && newCard < currentCard)
    ) {
      setScore(prevScore => prevScore + 1);
    } else {
      setScore(prevScore => prevScore - 1);
    }
    
    setCurrentCard(newCard);
    setNextCard(null); // Reset the next card for the animation
  };

  return (
    <div className="game">
      <ScoreBoard score={score} />
      <div className="card-container">
        <Card value={currentCard} />
      </div>
      <div className="actions">
        <button onClick={() => handleGuess('higher')}>Higher</button>
        <button onClick={() => handleGuess('lower')}>Lower</button>
      </div>
    </div>
  );
};

export default Game;