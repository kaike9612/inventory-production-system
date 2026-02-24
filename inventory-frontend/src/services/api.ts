import axios from 'axios';
import { Product, RawMaterial, ProductRawMaterial, ProductionSimulation } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// Raw Material API
export const getRawMaterials = async (): Promise<RawMaterial[]> => {
  const response = await api.get('/raw-materials');
  return response.data;
};

export const getRawMaterialById = async (id: number): Promise<RawMaterial> => {
  const response = await api.get(`/raw-materials/${id}`);
  return response.data;
};

export const createRawMaterial = async (rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await api.post('/raw-materials', rawMaterial);
  return response.data;
};

export const updateRawMaterial = async (id: number, rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await api.put(`/raw-materials/${id}`, rawMaterial);
  return response.data;
};

export const deleteRawMaterial = async (id: number): Promise<void> => {
  await api.delete(`/raw-materials/${id}`);
};

// Product Raw Material API
export const getProductRawMaterials = async (): Promise<ProductRawMaterial[]> => {
  const response = await api.get('/product-raw-materials');
  return response.data;
};

export const createProductRawMaterial = async (data: ProductRawMaterial): Promise<ProductRawMaterial> => {
  const response = await api.post('/product-raw-materials', data);
  return response.data;
};

export const deleteProductRawMaterial = async (id: number): Promise<void> => {
  await api.delete(`/product-raw-materials/${id}`);
};

// Production Simulation API
export const getProductionSimulation = async (): Promise<ProductionSimulation[]> => {
  const response = await api.get('/production/simulation');
  return response.data;
};

export default api;
