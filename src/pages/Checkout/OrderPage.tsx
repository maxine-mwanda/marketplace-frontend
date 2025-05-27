import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../../api/products';
import { createOrder } from '../../../api/orders';
import { useNotification } from '../../../contexts/NotificationContext';
import { useForm } from '../../../hooks/useForm';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
  quantity: yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
  shippingAddress: yup.string().required('Shipping address is required'),
  paymentMethod: yup.string().required('Payment method is required'),
});

const OrderPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm(orderSchema);
  const quantity = watch('quantity', 1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (productId) {
          const data = await getProductById(productId);
          setProduct(data);
        }
      } catch (error) {
        showNotification('Failed to load product details', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId, showNotification]);

  const onSubmit = async (data: any) => {
    try {
      if (!productId) return;
      const orderData = {
        productId,
        quantity: data.quantity,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
      };
      await createOrder(orderData, localStorage.getItem('token') || '');
      showNotification('Order placed successfully!', 'success');
      navigate('/profile');
    } catch (error) {
      showNotification('Failed to place order', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Order Product: {product.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Seller: {product.seller.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: ${product.price} each
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              {...register('quantity')}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              inputProps={{ min: 1, max: product.stock }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Total Price"
              value={`$${totalPrice}`}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Shipping Address"
              {...register('shippingAddress')}
              error={!!errors.shippingAddress}
              helperText={errors.shippingAddress?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Payment Method"
              {...register('paymentMethod')}
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod?.message}
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderPage;