import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        bg-gradient-dark from-dark-900/95 to-dark-800/95 
        backdrop-blur-xl 
        border border-dark-700/50 
        rounded-xl 
        shadow-lg 
        hover:shadow-glow 
        transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardProps) {
  return (
    <div className={`p-4 border-b border-dark-700/50 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}