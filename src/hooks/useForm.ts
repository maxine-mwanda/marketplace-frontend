import { useForm as useHookForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotification } from '../contexts/NotificationContext';

export const useForm = <T extends yup.AnyObjectSchema>(
  schema: T,
  defaultValues?: yup.InferType<T>
): UseFormReturn<yup.InferType<T>> => {
  const { showNotification } = useNotification();

  const methods = useHookForm<yup.InferType<T>>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleFormError = (errors: any) => {
    const firstError = Object.values(errors)[0] as { message?: string };
    if (firstError?.message) {
      showNotification(firstError.message, 'error');
    }
  };

  return {
    ...methods,
    handleSubmit: (onValid) => methods.handleSubmit(onValid, handleFormError),
  };
};