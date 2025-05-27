export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  providerId: string;
  provider: {
    name: string;
    avatar?: string;
  };
  rating?: number;
  reviewCount?: number;
  availability: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  availability: string[];
}