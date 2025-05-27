import * as yup from 'yup';

export const emailValidator = yup
  .string()
  .email('Invalid email format')
  .required('Email is required');

export const passwordValidator = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');

export const nameValidator = yup
  .string()
  .min(2, 'Name must be at least 2 characters')
  .required('Name is required');

export const serviceValidator = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  category: yup.string().required('Category is required'),
});

export const productValidator = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  category: yup.string().required('Category is required'),
  stock: yup
    .number()
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
});