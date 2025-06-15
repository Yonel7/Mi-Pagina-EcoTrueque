import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as authService from '../services/auth';

interface User {
  _id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  phone?: string;
  rating?: number;
  totalRatings?: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    return token && savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response._id,
        name: response.name,
        email: response.email,
        location: response.location,
        bio: response.bio,
        phone: response.phone,
        rating: response.rating,
        totalRatings: response.totalRatings,
        avatar: response.avatar
      }));
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        location: response.location,
        bio: response.bio,
        phone: response.phone,
        rating: response.rating,
        totalRatings: response.totalRatings,
        avatar: response.avatar
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.register({ name, email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response._id,
        name: response.name,
        email: response.email,
        location: response.location,
        bio: response.bio,
        phone: response.phone,
        rating: response.rating,
        totalRatings: response.totalRatings,
        avatar: response.avatar
      }));
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        location: response.location,
        bio: response.bio,
        phone: response.phone,
        rating: response.rating,
        totalRatings: response.totalRatings,
        avatar: response.avatar
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};