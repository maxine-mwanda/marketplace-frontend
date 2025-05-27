import axios from 'axios';
import { Review, ReviewFormData } from '../types/reviews.types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchReviews = async (itemId: string, itemType: 'service' | 'product'): Promise<Review[]> => {
  const response = await axios.get(`${API_URL}/reviews`, {
    params: { itemId, itemType },
  });
  return response.data;
};

export const createReview = async (data: ReviewFormData, token: string): Promise<Review> => {
  const response = await axios.post(`${API_URL}/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReview = async (reviewId: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};