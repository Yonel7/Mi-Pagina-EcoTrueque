import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  phone?: string;
  rating?: number;
  totalRatings?: number;
  token: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  location?: string;
  bio?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const updateProfile = async (data: UpdateProfileData): Promise<AuthResponse> => {
  const response = await api.put('/auth/profile', data);
  return response.data;
};