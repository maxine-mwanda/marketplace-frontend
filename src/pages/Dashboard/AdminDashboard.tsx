import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { getPlatformStats } from '../../../api/admin';
import { useNotification } from '../../../contexts/NotificationContext';
import { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getPlatformStats(token);
          setStats(data);
        }
      } catch (error) {
        showNotification('Failed to load platform stats', 'error');
      }
    };
    loadStats();
  }, [showNotification]);

  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <Typography variant="h5">Unauthorized Access</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {stats && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{stats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Services</Typography>
                <Typography variant="h4">{stats.activeServices}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Products</Typography>
                <Typography variant="h4">{stats.activeProducts}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Bookings</Typography>
                <Typography variant="h4">{stats.recentBookings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;