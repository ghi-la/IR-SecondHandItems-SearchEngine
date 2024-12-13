'use client';

import { getHealth } from '@/services/documents';
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

  function handleGetHealth() {
    dispatch({ type: 'IS_LOADING' });
    getHealth()
      .then((response) => {
        dispatch(
          openNotification({ severity: 'success', message: response.status })
        );
      })
      .catch((error) => {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'PyTerrier is not healthy',
          })
        );
      })
      .finally(() => {
        dispatch({ type: 'IS_LOADED' });
      });
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
      <Button variant="contained" color="primary" onClick={handleGetHealth}>
        Test Terrier Health
      </Button>
    </div>
  );
}
