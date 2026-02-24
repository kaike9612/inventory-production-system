import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, Boxes, BarChart3, LayoutDashboard } from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Produtos', icon: Package },
  { path: '/raw-materials', label: 'Matérias-Primas', icon: Boxes },
  { path: '/production', label: 'Simulação de Produção', icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#071a14] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-bold text-white">StockFlow</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#1a7a4e] text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">
          Sistema de gerenciamento de estoque
        </p>
      </div>
    </aside>
  );
};
