import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="ml-[260px]">
        <Header title={title} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
