import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NotificationProvider>
          <GlobalStyles />
          <Router>
            <Navbar />
            <AppRoutes />
            <Footer />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;