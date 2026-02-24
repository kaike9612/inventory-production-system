import React, { useState, useEffect } from 'react';
import { ProductionSimulation } from '../types';
import { getProductionSimulation } from '../services/api';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const ProductionSimulationPage: React.FC = () => {
  const [simulationResults, setSimulationResults] = useState<ProductionSimulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSimulation();
  }, []);

  const loadSimulation = async () => {
    try {
      setLoading(true);
      const data = await getProductionSimulation();
      setSimulationResults(data);
    } catch (err) {
      toast.error('Failed to load production simulation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
          <button
            onClick={loadSimulation}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a7a4e] text-white rounded-lg hover:bg-[#156b42] transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Run Simulation
          </button>
        </div>
      </div>

      {/* Results Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Possible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : simulationResults.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No production possible with current stock. Please add raw materials and product associations.
                  </td>
                </tr>
              ) : (
                simulationResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{result.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ecfdf5] text-[#065f46]">
                        {result.quantityPossible} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                      ${Number(result.totalValue).toFixed(2)}
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

export default ProductionSimulationPage;
