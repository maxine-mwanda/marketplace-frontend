import axios from 'axios';
import { Booking, BookingFormData } from '../types/bookings.types';

const API_URL = import.meta.env.VITE_API_URL;

export const createBooking = async (data: BookingFormData, token: string): Promise<Booking> => {
  const response = await axios.post(`${API_URL}/bookings`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUserBookings = async (token: string): Promise<Booking[]> => {
  const response = await axios.get(`${API_URL}/bookings/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancelBooking = async (bookingId: string, token: string): Promise<void> => {
  await axios.patch(
    `${API_URL}/bookings/${bookingId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};