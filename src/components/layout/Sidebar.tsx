import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/chat', label: 'Curriculum', icon: '📚' },
    { path: '/roadmap', label: 'Research', icon: '🔬' },
    { path: '/courses', label: 'Notes', icon: '📝' },
    { path: '/profile', label: 'Settings', icon: '⚙' }
  ];

  return (
    <aside className="w-20 bg-dark-panel/30 backdrop-blur-xl border-r border-dark-border/30 h-screen sticky top-0 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-glow">
          <span className="text-2xl font-bold">L</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                  : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-dark-panel border border-dark-border rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap text-sm">
              {item.label}
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Support Button */}
      <button className="w-14 h-14 rounded-xl bg-dark-panel-hover border border-dark-border flex items-center justify-center text-slate-500 hover:text-accent-blue hover:border-accent-blue/50 transition-all duration-300">
        <span className="text-xl">?</span>
      </button>
    </aside>
  );
};
