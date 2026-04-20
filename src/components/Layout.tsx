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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <Sidebar
        items={navigationItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-[280px] ml-0">
        <Navbar title={title} subtitle={subtitle} />

        <div className="md:hidden px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <span>☰ Menu</span>
          </button>
        </div>

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 lg:p-10 xl:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
