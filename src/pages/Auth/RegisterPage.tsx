import React from 'react';
import { Container, Typography, Box, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { register } from '../../../api/auth';
import { useNotification } from '../../../contexts/NotificationContext';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  role: yup.string().oneOf(['buyer', 'provider', 'seller']).required('Role is required'),
});

const RegisterPage: React.FC = () => {
  const { showNotification } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm(registerSchema);

  const onSubmit = async (data: any) => {
    try {
      await register(data);
      showNotification('Registration successful! Please login.', 'success');
    } catch (error) {
      showNotification('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Role"
            select
            {...register('role')}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="provider">Service Provider</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;