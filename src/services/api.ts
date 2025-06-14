import axios from 'axios';

// Configuración de la URL base de la API
const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ No se puede conectar al servidor backend. Asegúrate de que esté ejecutándose en http://localhost:5000');
    } else if (error.response?.status === 404) {
      console.error('❌ Endpoint no encontrado:', error.config?.url);
    } else {
      console.error('❌ Error de API:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;