import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Marketplace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting buyers with sellers and service providers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link component={RouterLink} to="/" color="inherit" variant="body2">
                Home
              </Link>
              <Link component={RouterLink} to="/services" color="inherit" variant="body2">
                Services
              </Link>
              <Link component={RouterLink} to="/products" color="inherit" variant="body2">
                Products
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link component={RouterLink} to="/about" color="inherit" variant="body2">
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" variant="body2">
                Contact
              </Link>
              <Link component={RouterLink} to="/faq" color="inherit" variant="body2">
                FAQ
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link component={RouterLink} to="/privacy" color="inherit" variant="body2">
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms" color="inherit" variant="body2">
                Terms of Use
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Marketplace. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;