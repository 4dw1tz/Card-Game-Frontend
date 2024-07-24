import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Card Guessing Game</h1>
      <Game />
    </div>
  );
};

export default App;