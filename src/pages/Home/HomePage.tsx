import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { fetchFeatured } from '../../api/products';
import { fetchServices } from '../../api/services';
import ServiceCard from '../../components/marketplace/ServiceCard/ServiceCard';
import ProductCard from '../../components/marketplace/ProductCard/ProductCard';
import SearchBar from '../../components/marketplace/SearchBar/SearchBar';
import { Service } from '../../types/services.types';
import { Product } from '../../types/products.types';

const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, productsData] = await Promise.all([
          fetchServices(),
          fetchFeatured(),
        ]);
        setServices(servicesData.slice(0, 3));
        setProducts(productsData.slice(0, 3));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Marketplace for Services & Products
      </Typography>
      
      <SearchBar />
      
      <Typography variant="h4" component="h2" gutterBottom mt={4}>
        Featured Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h4" component="h2" gutterBottom mt={4}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;