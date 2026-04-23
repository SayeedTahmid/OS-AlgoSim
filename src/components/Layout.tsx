import * as React from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 w-full overflow-x-hidden">
      <Sidebar
        items={navigationItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col w-full min-h-screen md:ml-[280px]">
        <div className="flex items-center gap-3 px-3 py-3 border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-40 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10 flex-shrink-0"
          >
            <span>☰ Menu</span>
          </button>
          <div className="overflow-hidden">
            <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
            {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="hidden md:block">
          <Navbar title={title} subtitle={subtitle} />
        </div>

        <main className="flex-1 w-full overflow-x-hidden">
          <div className="px-3 py-4 md:p-8 lg:p-10 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};