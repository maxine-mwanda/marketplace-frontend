import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../../../api/services';
import { createBooking } from '../../../api/bookings';
import { useNotification } from '../../../contexts/NotificationContext';
import { useForm } from '../../../hooks/useForm';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const bookingSchema = yup.object().shape({
  date: yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
  time: yup.string().required('Time is required'),
  notes: yup.string(),
});

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm(bookingSchema);

  useEffect(() => {
    const loadService = async () => {
      try {
        if (serviceId) {
          const data = await getServiceById(serviceId);
          setService(data);
        }
      } catch (error) {
        showNotification('Failed to load service details', 'error');
      } finally {
        setLoading(false);
        setValue('date', new Date());
        setValue('time', '10:00');
      }
    };
    loadService();
  }, [serviceId, showNotification, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (!serviceId) return;
      const bookingData = {
        serviceId,
        date: data.date.toISOString().split('T')[0],
        time: data.time,
        notes: data.notes,
      };
      await createBooking(bookingData, localStorage.getItem('token') || '');
      showNotification('Booking created successfully!', 'success');
      navigate('/profile');
    } catch (error) {
      showNotification('Failed to create booking', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Book Service: {service.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Provider: {service.provider.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: ${service.price}/hour
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              selected={register('date').value}
              onChange={(date) => setValue('date', date)}
              minDate={new Date()}
              customInput={
                <TextField
                  fullWidth
                  label="Booking Date"
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Time Slot"
              {...register('time')}
              error={!!errors.time}
              helperText={errors.time?.message}
            >
              {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Notes"
              {...register('notes')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large">
              Confirm Booking
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BookingPage;