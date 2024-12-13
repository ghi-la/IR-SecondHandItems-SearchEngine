'use client';

import store from '@/store/store';
import { Provider } from 'react-redux';
import LoadingBackdrop from './components/LoadingBackdrop';
import Notification from './components/Notification';

export default function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children}
      <Notification />
      <LoadingBackdrop />
    </Provider>
  );
}
