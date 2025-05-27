import { useState } from 'react';
import { handleApiError } from '../utils/api';
import { useNotification } from '../contexts/NotificationContext';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export const useApi = <T,>(apiFunction: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const request = async (...args: Parameters<ApiFunction<T>>): Promise<T | void> => {
    setLoading(true);
    try {
      const result = await apiFunction(...args);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};