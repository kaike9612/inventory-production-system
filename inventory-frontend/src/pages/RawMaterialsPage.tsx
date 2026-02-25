import React, { useState, useEffect } from 'react';
import { RawMaterial } from '../types';
import { getRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial, checkBackendHealth } from '../services/api';
import { Plus, Pencil, Trash2, Loader2, AlertTriangle, RefreshCw, Package } from 'lucide-react';
import { toast } from 'sonner';

const RawMaterialsPage: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
  const [formData, setFormData] = useState<RawMaterial>({ name: '', stockQuantity: 0 });
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth();
    loadRawMaterials();
  }, []);

  const checkHealth = async () => {
    const isOnline = await checkBackendHealth();
    setBackendOnline(isOnline);
    if (!isOnline) {
      toast.error('Backend indisponível. Inicie o servidor em http://localhost:8080');
    }
  };

  const loadRawMaterials = async () => {
    try {
      setLoading(true);
      const data = await getRawMaterials();
      setRawMaterials(data);
      setBackendOnline(true);
    } catch (err: any) {
      console.error('Erro ao carregar matérias-primas:', err);
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
        toast.error('Falha ao carregar matérias-primas');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMaterial) {
        await updateRawMaterial(editingMaterial.id!, formData);
        toast.success('Matéria-prima atualizada com sucesso');
      } else {
        await createRawMaterial(formData);
        toast.success('Matéria-prima criada com sucesso');
      }
      setShowModal(false);
      setEditingMaterial(null);
      setFormData({ name: '', stockQuantity: 0 });
      loadRawMaterials();
    } catch (err: any) {
      console.error('Erro ao salvar matéria-prima:', err);
      const status = err.response?.status;
      
      if (status === 500) {
        toast.error('Erro ao salvar. Verifique os dados e tente novamente');
      } else if (status === 400) {
        toast.error('Dados inválidos. Preencha todos os campos corretamente');
      } else {
        toast.error('Falha ao salvar matéria-prima');
      }
    }
  };

  const handleEdit = (material: RawMaterial) => {
    setEditingMaterial(material);
    setFormData(material);
    setShowModal(true);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteRawMaterial(deleteId);
        toast.success('Matéria-prima excluída com sucesso');
        setShowDeleteModal(false);
        setDeleteId(null);
        loadRawMaterials();
      } catch (err) {
        toast.error('Falha ao excluir matéria-prima');
      }
    }
  };

  const openModal = () => {
    setEditingMaterial(null);
    setFormData({ name: '', stockQuantity: 0 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMaterial(null);
    setFormData({ name: '', stockQuantity: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a7a4e]" />
        <span className="ml-3 text-gray-500">Carregando matérias-primas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Matérias-Primas</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie as matérias-primas do sistema</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={checkHealth}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Verificar Conexão
          </button>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a7a4e] text-white rounded-lg hover:bg-[#156b42] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Nova Matéria-Prima
          </button>
        </div>
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

      {/* Raw Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {rawMaterials.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma matéria-prima cadastrada</p>
            <button
              onClick={openModal}
              className="mt-4 text-[#1a7a4e] hover:underline text-sm font-medium"
            >
              Criar primeira matéria-prima
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rawMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{material.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a7a4e] font-medium">
                      {material.stockQuantity} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-gray-400 hover:text-[#1a7a4e] transition-colors mr-3"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(material.id!)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingMaterial ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Matéria-Prima</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a7a4e] focus:border-transparent outline-none transition-colors"
                    placeholder="Ex: Aço"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade em Estoque</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a7a4e] focus:border-transparent outline-none transition-colors"
                    placeholder="Ex: 100"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1a7a4e] text-white rounded-lg hover:bg-[#156b42] transition-colors text-sm font-medium"
                >
                  {editingMaterial ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">Confirmar Exclusão</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Tem certeza que deseja excluir esta matéria-prima? Esta ação não pode ser desfeita.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialsPage;
