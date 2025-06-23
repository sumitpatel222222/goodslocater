import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow overflow-hidden';
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1' 
    : '';
  const cursorClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${cursorClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`px-4 py-5 border-b border-gray-200 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`px-4 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>{children}</div>;
};

interface CardImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt = '', className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default Card;