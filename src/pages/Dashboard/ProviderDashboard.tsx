import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchServices } from '../../api/services';
import { Service } from '../../types/services.types';
import ServiceCard from '../../components/marketplace/ServiceCard/ServiceCard';
import AddIcon from '@mui/icons-material/Add';

const ProviderDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Services</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/services/new"
        >
          Add New Service
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : services.length === 0 ? (
        <Typography>You haven't created any services yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <ServiceCard service={service} editable />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProviderDashboard;