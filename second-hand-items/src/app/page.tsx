'use client';

import Search from '@/app/components/Search';
import {
  fetchAllItems,
  getDocumentsInfo,
  getHealth,
} from '@/services/documents';
import { openNotification, setCategories, setPriceMax } from '@/store/actions';
import { DocumentsInfo } from '@/store/models';
import { Button, Divider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'IS_LOADING' });
    getDocumentsInfo()
      .then((info: DocumentsInfo | undefined) => {
        dispatch(setCategories(info?.categories || []));
        dispatch(setPriceMax(info?.priceMax || 50));
      })
      .finally(() => {
        dispatch({ type: 'IS_LOADED' });
      });
  }, []);

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
      .then((response: any) => {
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
  function handleGetAll() {
    dispatch({ type: 'IS_LOADING' });
    fetchAllItems()
      .then((response) => {
        console.log(response);
        dispatch(
          openNotification({
            severity: 'success',
            message: response.length + ' documents console logged',
          })
        );
      })
      .catch((error) => {
        dispatch(
          openNotification({
            severity: 'error',
            message: 'Error fetching items',
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
      <Button variant="contained" color="primary" onClick={handleGetAll}>
        Get All Documents
      </Button>
      <Divider />
      <Search />
    </div>
  );
}
