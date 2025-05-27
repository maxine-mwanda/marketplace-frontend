import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardMedia, Button, Divider, Rating } from '@mui/material';
import { getProductById } from '../../../api/products';
import { useNotification } from '../../../contexts/NotificationContext';
import { addToCart } from '../../../utils/cart';
import { fetchReviews } from '../../../api/reviews';
import ReviewList from '../../../components/marketplace/ReviewList/ReviewList';
import AddReviewForm from '../../../components/marketplace/AddReviewForm/AddReviewForm';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (productId) {
          const [productData, reviewsData] = await Promise.all([
            getProductById(productId),
            fetchReviews(productId, 'product'),
          ]);
          setProduct(productData);
          setReviews(reviewsData);
        }
      } catch (error) {
        showNotification('Failed to load product details', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [productId, showNotification]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    showNotification('Product added to cart', 'success');
  };

  const handleAddReview = (newReview: any) => {
    setReviews([...reviews, newReview]);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.images[0] || '/default-product.jpg'}
              alt={product.name}
              sx={{ height: 400, objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviewCount} reviews)
            </Typography>
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Seller: {product.seller.name}
          </Typography>
          <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error'} gutterBottom>
           