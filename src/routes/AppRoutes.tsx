import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ServiceListPage from '../pages/Marketplace/ServiceListPage';
import ProductListPage from '../pages/Marketplace/ProductListPage';
import ServiceDetailPage from '../pages/Marketplace/ServiceDetailPage';
import ProductDetailPage from '../pages/Marketplace/ProductDetailPage';
import UserProfilePage from '../pages/Dashboard/UserProfilePage';
import ProviderDashboard from '../pages/Dashboard/ProviderDashboard';
import SellerDashboard from '../pages/Dashboard/SellerDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import BookingPage from '../pages/Checkout/BookingPage';
import OrderPage from '../pages/Checkout/OrderPage';
import ProtectedRoute from './ProtectedRoute';
import AboutPage from '../pages/Static/AboutPage';
import ContactPage from '../pages/Static/ContactPage';
import FAQPage from '../pages/Static/FAQPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/services" element={<ServiceListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/book/:serviceId" element={<BookingPage />} />
        <Route path="/order/:productId" element={<OrderPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={['provider']} />}>
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={['seller']} />}>
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;