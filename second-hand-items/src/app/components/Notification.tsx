'use client';
import { closeNotification } from '@/store/actions';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.app.notification);

  function handleClose() {
    dispatch(closeNotification());
  }

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
