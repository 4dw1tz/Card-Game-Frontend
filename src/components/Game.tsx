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
  const [transitionCard, setTransitionCard] = useState<number | null>(null);

  useEffect(() => {
    const postScore = async () => {
      try {
        await fetch(`${apiUrl}/Game`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            points: score,
          })
        });
      } catch (error) {
        console.error('Error posting score:', error);
      }
    };

    if (score !== 0) {
      postScore();
    }
  }, [score]);

  const handleGuess = (guess: 'higher' | 'lower') => {
    const newCard = generateRandomCard();
    setTransitionCard(newCard);

    setTimeout(() => {
      if (
        (guess === 'higher' && newCard > currentCard) ||
        (guess === 'lower' && newCard < currentCard)
      ) {
        setScore(prevScore => prevScore + 1);
      } else {
        setScore(prevScore => prevScore - 1);
      }

      setCurrentCard(newCard);
      setTransitionCard(null);
    }, 600);
  };

  return (
    <div className="game">
      <nav className="navbar">
        <h1>Card Guessing Game</h1>
      </nav>
      <ScoreBoard score={score} />
      <div className="card-container">
        <Card value={currentCard} />
        {transitionCard !== null && <Card value={transitionCard} className="transition-card" />}
      </div>
      <div className="actions">
        <button className="action-button" onClick={() => handleGuess('higher')}>Higher</button>
        <button className="action-button" onClick={() => handleGuess('lower')}>Lower</button>
      </div>
      <div className="card-pile">
        <div className="card-back"></div>
        <div className="card-back"></div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Game;