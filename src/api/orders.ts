import axios from 'axios';
import { Order, OrderFormData } from '../types/orders.types';

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (data: OrderFormData, token: string): Promise<Order> => {
  const response = await axios.post(`${API_URL}/orders`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUserOrders = async (token: string): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancelOrder = async (orderId: string, token: string): Promise<void> => {
  await axios.patch(
    `${API_URL}/orders/${orderId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};