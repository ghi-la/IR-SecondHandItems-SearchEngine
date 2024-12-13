'use client';

import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const LoadingBackdrop = () => {
  const isLoading = useSelector((state: any) => state.app.isLoading);
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
