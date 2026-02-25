import React, { useState, useEffect } from 'react';
import { getProducts, getRawMaterials, getProductionSimulation, checkBackendHealth } from '../services/api';
import { Product } from '../types';
import { RawMaterial } from '../types';
import { ProductionSimulation } from '../types';
import { Package, Boxes, DollarSign, TrendingUp, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [simulation, setSimulation] = useState<ProductionSimulation[]>([]);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const checkHealth = async () => {
    const isOnline = await checkBackendHealth();
    setBackendOnline(isOnline);
    if (!isOnline) {
      toast.error('Backend indisponível. Inicie o servidor em http://localhost:8080');
    }
    return isOnline;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Check health first
      const isOnline = await checkHealth();
      if (!isOnline) {
        setLoading(false);
        return;
      }
      
      const [productsData, rawMaterialsData, simulationData] = await Promise.all([
        getProducts(),
        getRawMaterials(),
        getProductionSimulation()
      ]);
      setProducts(productsData);
      setRawMaterials(rawMaterialsData);
      setSimulation(simulationData);
      setBackendOnline(true);
    } catch (err: any) {
      console.error('Erro ao carregar dashboard:', err);
      const url = err.config?.url || 'unknown';
      const status = err.response?.status;
      
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        toast.error('Backend indisponível. Inicie o servidor em http://localhost:8080');
        setBackendOnline(false);
      } else if (status === 404) {
        toast.error(`Rota não encontrada (404): ${url}`);
      } else if (status === 500) {
        toast.error('Erro interno (500). Verifique os logs do backend');
      } else {
        toast.error('Falha ao carregar dados do dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate most expensive product
  const mostExpensiveProduct = products.reduce((max, product) => {
    if (!max || Number(product.price) > Number(max.price)) {
      return product;
    }
    return max;
  }, null as Product | null);

  // Calculate product with highest production capacity
  const highestCapacityProduct = simulation.length > 0
    ? simulation.reduce((max, item) => {
        if (!max || item.quantityPossible > max.quantityPossible) {
          return item;
        }
        return max;
      }, simulation[0])
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a7a4e]" />
        <span className="ml-3 text-gray-500">Carregando dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Visão geral do sistema de produção</p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* Backend Status */}
      {backendOnline === false && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Backend offline</p>
            <p className="text-xs text-red-600">Inicie o servidor Spring Boot em http://localhost:8080</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Produtos</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#ecfdf5] rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-[#1a7a4e]" />
            </div>
          </div>
        </div>

        {/* Total Raw Materials */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Matérias-Primas</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{rawMaterials.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
              <Boxes className="w-6 h-6 text-[#d97706]" />
            </div>
          </div>
        </div>

        {/* Most Expensive Product */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Produto Mais Caro</p>
              <p className="text-lg font-bold text-gray-800 mt-1 truncate">
                {mostExpensiveProduct ? mostExpensiveProduct.name : 'N/A'}
              </p>
              <p className="text-sm text-[#1a7a4e] font-medium">
                {mostExpensiveProduct ? `R$ ${Number(mostExpensiveProduct.price).toFixed(2)}` : ''}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#2563eb]" />
            </div>
          </div>
        </div>

        {/* Highest Production Capacity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Maior Capacidade</p>
              <p className="text-lg font-bold text-gray-800 mt-1 truncate">
                {highestCapacityProduct ? highestCapacityProduct.productName : 'N/A'}
              </p>
              <p className="text-sm text-[#1a7a4e] font-medium">
                {highestCapacityProduct ? `${highestCapacityProduct.quantityPossible} unidades` : ''}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#fce7f3] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#db2777]" />
            </div>
          </div>
        </div>
      </div>

      {/* Production Simulation Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Capacidade de Produção</h2>
          <p className="text-sm text-gray-500 mt-1">Quantidade possível de produção para cada produto</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade Possible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {simulation.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Nenhum dado de simulação disponível. Configure as matérias-primas e produtos primeiro.
                  </td>
                </tr>
              ) : (
                simulation.slice(0, 5).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.quantityPossible}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a7a4e] font-medium">
                      R$ {Number(item.totalValue).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
