import axios, { AxiosError } from 'axios';
import { Product, RawMaterial, ProductRawMaterial, ProductionSimulation } from '../types';

// Usar variável de ambiente ou fallback para localhost
// Create React App usa o prefixo REACT_APP_
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging de erros (desenvolvimento)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const url = error.config?.url || 'unknown';
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const status = error.response?.status;
    
    // Log detalhado no console
    console.error(`[API Error] ${method} ${url}`, {
      status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    // Tratamento específico por tipo de erro
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('Backend indisponível! Verifique se o servidor está rodando em http://localhost:8080');
    } else if (status === 404) {
      console.error(`Rota não encontrada: ${url} (404)`);
    } else if (status === 403) {
      console.error('Erro de CORS: backend bloqueou a origem');
    } else if (status === 500) {
      console.error('Erro interno do servidor (500)');
    }

    return Promise.reject(error);
  }
);

// Product API
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await apiClient.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await apiClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

// Raw Material API
export const getRawMaterials = async (): Promise<RawMaterial[]> => {
  const response = await apiClient.get('/raw-materials');
  return response.data;
};

export const getRawMaterialById = async (id: number): Promise<RawMaterial> => {
  const response = await apiClient.get(`/raw-materials/${id}`);
  return response.data;
};

export const createRawMaterial = async (rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await apiClient.post('/raw-materials', rawMaterial);
  return response.data;
};

export const updateRawMaterial = async (id: number, rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await apiClient.put(`/raw-materials/${id}`, rawMaterial);
  return response.data;
};

export const deleteRawMaterial = async (id: number): Promise<void> => {
  await apiClient.delete(`/raw-materials/${id}`);
};

// Product Raw Material API
export const getProductRawMaterials = async (): Promise<ProductRawMaterial[]> => {
  const response = await apiClient.get('/product-raw-materials');
  return response.data;
};

export const createProductRawMaterial = async (data: ProductRawMaterial): Promise<ProductRawMaterial> => {
  const response = await apiClient.post('/product-raw-materials', data);
  return response.data;
};

export const deleteProductRawMaterial = async (id: number): Promise<void> => {
  await apiClient.delete(`/product-raw-materials/${id}`);
};

// Production Simulation API
export const getProductionSimulation = async (): Promise<ProductionSimulation[]> => {
  const response = await apiClient.get('/production/simulation');
  return response.data;
};

// Health check
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/raw-materials', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};

export default apiClient;
