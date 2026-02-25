import React, { useState, useEffect } from 'react';
import { ProductionSimulation } from '../types';
import { getProductionSimulation, checkBackendHealth } from '../services/api';
import { RefreshCw, TrendingUp, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const ProductionSimulationPage: React.FC = () => {
  const [simulationResults, setSimulationResults] = useState<ProductionSimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth();
    loadSimulation();
  }, []);

  const checkHealth = async () => {
    const isOnline = await checkBackendHealth();
    setBackendOnline(isOnline);
    if (!isOnline) {
      toast.error('Backend indisponível. Inicie o servidor em http://localhost:8080');
    }
  };

  const loadSimulation = async () => {
    try {
      setLoading(true);
      const data = await getProductionSimulation();
      setSimulationResults(data);
      setBackendOnline(true);
    } catch (err: any) {
      console.error('Erro ao carregar simulação:', err);
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
        toast.error('Falha ao carregar simulação de produção');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Simulação de Produção</h1>
          <p className="text-sm text-gray-500 mt-1">Calcule a capacidade de produção baseada no estoque</p>
        </div>
        <button
          onClick={loadSimulation}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a7a4e] text-white rounded-lg hover:bg-[#156b42] transition-colors text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Executar Simulação
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

      {/* Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#ecfdf5] rounded-lg">
            <TrendingUp className="text-[#1a7a4e]" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Simulação de Produção</h3>
            <p className="text-gray-600 text-sm">
              Esta simulação calcula a quantidade máxima de cada produto que pode ser produzida 
              com base no estoque disponível de matérias-primas. Os resultados são ordenados 
              pelo preço do produto em ordem decrescente.
            </p>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#1a7a4e]" />
            <span className="ml-3 text-gray-500">Carregando simulação...</span>
          </div>
        ) : simulationResults.length === 0 ? (
          <div className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma produção possível com o estoque atual.</p>
            <p className="text-sm text-gray-400 mt-2">Adicione matérias-primas e associe aos produtos primeiro.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade Produzível</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {simulationResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{result.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ecfdf5] text-[#065f46]">
                        {result.quantityPossible} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                      R$ {Number(result.totalValue).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionSimulationPage;
