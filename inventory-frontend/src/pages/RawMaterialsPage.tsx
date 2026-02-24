import React, { useState, useEffect } from 'react';
import { RawMaterial } from '../types';
import { getRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../services/api';
import { Plus, Pencil, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const RawMaterialsPage: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
  const [formData, setFormData] = useState<RawMaterial>({ name: '', stockQuantity: 0 });

  useEffect(() => {
    loadRawMaterials();
  }, []);

  const loadRawMaterials = async () => {
    try {
      setLoading(true);
      const data = await getRawMaterials();
      setRawMaterials(data);
    } catch (err) {
      toast.error('Falha ao carregar matérias-primas');
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
    } catch (err) {
      toast.error('Falha ao salvar matéria-prima');
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

  const getStockBadge = (quantity: number) => {
    if (quantity < 20) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <AlertTriangle size={12} />
          Critical
        </span>
      );
    }
    if (quantity < 50) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          <AlertTriangle size={12} />
          Low Stock
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Gerencie suas matérias-primas e seu estoque.</h2>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a7a4e] text-white rounded-lg hover:bg-[#156b42] transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            Nova Matéria-Prima
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade em Estoque</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Carregando...
                    </div>
                  </td>
                </tr>
              ) : rawMaterials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <p>Nenhuma matéria-prima encontrada.</p>
                      <p className="text-sm text-gray-400">Adicione uma para começar!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                rawMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{material.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{material.stockQuantity}</span>
                        {getStockBadge(material.stockQuantity || 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(material)}
                          className="p-2 text-gray-500 hover:text-[#1a7a4e] hover:bg-[#ecfdf5] rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(material.id!)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingMaterial ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a4e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade em Estoque</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a4e] focus:border-transparent"
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
