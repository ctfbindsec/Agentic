import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface p-4 sm:p-6 rounded-lg border border-border h-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;