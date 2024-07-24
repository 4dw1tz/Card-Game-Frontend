import React from 'react';
import './Card.css';

interface CardProps {
  value: number;
}

const Card: React.FC<CardProps> = ({ value }) => {
  return (
    <div className="card">
      {value}
    </div>
  );
};

export default Card;
