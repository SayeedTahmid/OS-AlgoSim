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
    <div className={`md:ml-0 border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-40 w-full ${className}`}>
      <div className="px-3 py-3 md:px-8 md:py-6 w-full overflow-hidden">
        <h2 className="text-lg md:text-3xl font-bold text-white truncate break-words">{title}</h2>
        {subtitle && <p className="text-gray-400 text-xs md:text-sm mt-1 truncate">{subtitle}</p>}
      </div>
    </div>
  );
};
