import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Tabs, Tab, Card, CardContent } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchUserBookings } from '../../../api/bookings';
import { fetchUserOrders } from '../../../api/orders';
import { Booking, Order } from '../../../types';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const [bookingsData, ordersData] = await Promise.all([
            fetchUserBookings(token),
            fetchUserOrders(token),
          ]);
          setBookings(bookingsData);
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h5">Please login to view your profile</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 4 }}>
        <Avatar
          src={user.avatar}
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Bookings" />
        <Tab label="Orders" />
        <Tab label="Settings" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            My Bookings
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : bookings.length === 0 ? (
            <Typography>You have no bookings yet.</Typography>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{booking.service.title}</Typography>
                  <Typography>
                    Date: {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </Typography>
                  <Typography>Status: {booking.status}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            My Orders
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : orders.length === 0 ? (
            <Typography>You have no orders yet.</Typography>
          ) : (
            orders.map((order) => (
              <Card key={order.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{order.product.name}</Typography>
                  <Typography>Quantity: {order.quantity}</Typography>
                  <Typography>Total: ${order.totalPrice}</Typography>
                  <Typography>Status: {order.status}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Account Settings
          </Typography>
          <Typography>Coming soon...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default UserProfilePage;