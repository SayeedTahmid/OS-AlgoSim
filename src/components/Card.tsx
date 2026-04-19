import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-2xl
          bg-gradient-to-br from-white/8 to-white/4
          backdrop-blur-md
          border border-white/10
          shadow-lg shadow-black/20
          transition-all duration-300
          hover:bg-gradient-to-br hover:from-white/12 hover:to-white/6
          hover:border-white/20
          hover:shadow-xl hover:shadow-black/30
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
