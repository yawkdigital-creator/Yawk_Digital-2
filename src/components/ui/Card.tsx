import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
}) => {
  const baseClasses = 'glass-card rounded-xl sm:rounded-2xl md:rounded-[32px] p-4 sm:p-6 md:p-8 transition-all duration-500';
  const hoverClasses = hover ? 'hover:-translate-y-2 sm:hover:-translate-y-4 hover:border-red-500/30 cursor-pointer active:scale-[0.98]' : '';
  const clickableClasses = onClick ? 'cursor-pointer touch-manipulation' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};
