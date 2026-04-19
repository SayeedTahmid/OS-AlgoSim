import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const navigationItems = [
  { label: 'Dashboard', path: '/', icon: '📊' },
  { label: 'CPU Scheduling', path: '/cpu-scheduling', icon: '⚡' },
  { label: 'Memory Management', path: '/memory-management', icon: '💾' },
  { label: 'Deadlock', path: '/deadlock', icon: '🔗' },
  { label: 'Performance Analyzer', path: '/performance-analyzer', icon: '📈' },
  { label: 'About', path: '/about', icon: 'ℹ️' }
];

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <Sidebar items={navigationItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
