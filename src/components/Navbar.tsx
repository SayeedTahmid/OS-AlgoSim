import * as React from 'react';

interface NavbarProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`ml-64 border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-40 ${className}`}>
      <div className="px-8 py-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
