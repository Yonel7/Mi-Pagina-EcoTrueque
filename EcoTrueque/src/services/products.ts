import api from './api';

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  condition: 'nuevo' | 'como_nuevo' | 'buen_estado' | 'usado';
  owner: {
    _id: string;
    name: string;
    location: string;
  };
  status: 'disponible' | 'reservado' | 'intercambiado';
  createdAt: string;
}

export const getProducts = async (params?: { category?: string; search?: string }) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getUserProducts = async () => {
  const response = await api.get('/products/user');
  return response.data;
};

export const createProduct = async (data: any) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};