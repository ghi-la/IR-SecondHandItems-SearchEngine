'use client';

import { openNotification } from '@/store/actions';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  function handleTestAlert() {
    dispatch(openNotification({ severity: 'success', message: 'Test Alert' }));
  }

  function handleTestLoading() {
    dispatch({ type: 'IS_LOADING' });
    setTimeout(() => {
      dispatch({ type: 'IS_LOADED' });
    }, 3000);
  }

  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" color="primary" onClick={handleTestAlert}>
        Test Alert
      </Button>
      <Button variant="contained" color="primary" onClick={handleTestLoading}>
        Test Loading
      </Button>
    </div>
  );
}
