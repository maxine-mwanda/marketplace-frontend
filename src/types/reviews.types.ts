export interface Review {
  id: string;
  userId: string;
  user: {
    name: string;
    avatar?: string;
  };
  itemId: string;
  itemType: 'service' | 'product';
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFormData {
  itemId: string;
  itemType: 'service' | 'product';
  rating: number;
  comment: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}