import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

export const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiAlert-icon': {
    alignItems: 'center',
  },
}));