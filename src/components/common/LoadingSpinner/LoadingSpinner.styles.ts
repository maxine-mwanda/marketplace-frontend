import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));