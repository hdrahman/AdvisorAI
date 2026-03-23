import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/chat', label: 'Chat', icon: '💬' },
    { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <aside className="w-64 bg-dark-panel border-r border-dark-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-2xl font-bold text-accent-blue">AdvisorAI</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent-blue text-white'
                      : 'text-gray-300 hover:bg-dark-border'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-dark-border">
        <p className="text-sm text-gray-400">© 2026 AdvisorAI</p>
      </div>
    </aside>
  );
};
