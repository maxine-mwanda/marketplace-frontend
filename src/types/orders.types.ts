export interface Order {
  id: string;
  productId: string;
  product: {
    name: string;
    price: number;
    sellerId: string;
  };
  userId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFormData {
  productId: string;
  quantity: number;
  shippingAddress: string;
  paymentMethod: string;
}