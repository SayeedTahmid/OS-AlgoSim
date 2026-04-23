import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from './Card';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, className = '', isOpen = false, onClose }) => {
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[calc(100vw-16px)] transform overflow-y-auto bg-gradient-to-b from-gray-950 to-black border-r border-white/10 pt-6 md:pt-8 transition-transform duration-300 md:w-[280px] md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}
      >
        <div className="px-4 md:px-6 mb-8 md:mb-12">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 truncate">
            <span className="text-primary text-2xl md:text-3xl flex-shrink-0">⚙️</span>
            <span className="truncate">OS Simulator</span>
          </h1>
          <p className="text-xs text-gray-400 mt-2">Algorithm Analyzer</p>
        </div>

      <nav className="space-y-2 px-2 md:px-4">
        {items.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg
                transition-all duration-200 truncate text-sm md:text-base
                ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }
              `}
            >
              <span className="text-lg md:text-xl flex-shrink-0">{item.icon}</span>
              <span className="font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-3 md:left-4 right-3 md:right-4">
        <Card className="p-3 md:p-4 text-center">
          <p className="text-xs text-gray-400 mb-1 md:mb-2">Educational Tool</p>
          <p className="text-xs text-primary font-semibold">OS Concepts Analyzer</p>
        </Card>
      </div>
    </aside>
    </>
  );
};
