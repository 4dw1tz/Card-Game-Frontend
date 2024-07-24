import React from 'react';
import './Card.css';

interface CardProps {
  value: number;
  className?: string; // Add className as an optional prop
}

const Card: React.FC<CardProps> = ({ value, className }) => {
  return (
    <div className={`card ${className}`}>
      {value}
    </div>
  );
};

export default Card;