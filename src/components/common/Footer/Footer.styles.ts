import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6),
  borderTop: `1px solid ${theme.palette.divider}`,
}));