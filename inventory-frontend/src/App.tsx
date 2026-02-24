import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProductsPage from './pages/ProductsPage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductionSimulationPage from './pages/ProductionSimulationPage';
import DashboardPage from './pages/DashboardPage';
import { MainLayout } from './components/MainLayout';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/dashboard" 
          element={<MainLayout title="Dashboard"><DashboardPage /></MainLayout>} 
        />
        <Route 
          path="/products" 
          element={<MainLayout title="Produtos"><ProductsPage /></MainLayout>} 
        />
        <Route 
          path="/raw-materials" 
          element={<MainLayout title="Matérias-Primas"><RawMaterialsPage /></MainLayout>} 
        />
        <Route 
          path="/production" 
          element={<MainLayout title="Simulação de Produção"><ProductionSimulationPage /></MainLayout>} 
        />
        <Route 
          path="/" 
          element={<MainLayout title="Dashboard"><DashboardPage /></MainLayout>} 
        />
      </Routes>
    </Router>
  );
};

export default App;
