import axios from 'axios';
import { User } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllUsers = async (token: string): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserRole = async (userId: string, role: string, token: string): Promise<User> => {
  const response = await axios.patch(
    `${API_URL}/admin/users/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPlatformStats = async (token: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};