import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../../api/products';
import { useAuth } from '../../../contexts/AuthContext';
import ProductCard from '../../../components/marketplace/ProductCard/ProductCard';
import AddIcon from '@mui/icons-material/Add';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Filter products by current seller
        const myProducts = data.filter((product: any) => product.sellerId === user?.id);
        setProducts(myProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [user?.id]);

  if (!user || user.role !== 'seller') {
    return (
      <Container>
        <Typography variant="h5">Unauthorized Access</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/products/new"
        >
          Add New Product
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : products.length === 0 ? (
        <Typography>You haven't listed any products yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} editable />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SellerDashboard;