import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '10px !important',
          width: 'calc(100% - 20px)',
        },
      },
    },
  },
});

export default theme;
