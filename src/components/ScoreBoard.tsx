import React from 'react';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="score-board">
      Score: {score}
    </div>
  );
};

export default ScoreBoard;