import axios from 'axios';
import { Service, ServiceFormData } from '../types/services.types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchServices = async (): Promise<Service[]> => {
  const response = await axios.get(`${API_URL}/services`);
  return response.data;
};

export const fetchServiceById = async (id: string): Promise<Service> => {
  const response = await axios.get(`${API_URL}/services/${id}`);
  return response.data;
};

export const createService = async (data: ServiceFormData, token: string): Promise<Service> => {
  const response = await axios.post(`${API_URL}/services`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};