import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'gradient';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false,
  variant = 'default',
}) => {
  const baseStyles = 'rounded-2xl shadow-sm backdrop-blur-sm animate-fade-in';
  const variantStyles = {
    default: 'bg-white dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50',
    gradient: 'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border-0',
  };
  const hoverStyles = hoverable ? 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;