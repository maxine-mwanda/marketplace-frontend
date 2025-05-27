export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'provider' | 'seller' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'provider' | 'seller';
  avatar?: File | null;
}