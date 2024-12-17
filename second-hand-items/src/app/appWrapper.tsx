'use client';

import store from '@/store/store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import LoadingBackdrop from './components/LoadingBackdrop';
import Notification from './components/Notification';
import theme from './style/theme';

export default function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Notification />
        <LoadingBackdrop />
      </ThemeProvider>
    </Provider>
  );
}
