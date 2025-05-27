import axios from 'axios';
import { LoginFormData, RegisterFormData, User } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data: LoginFormData): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const register = async (data: RegisterFormData): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};