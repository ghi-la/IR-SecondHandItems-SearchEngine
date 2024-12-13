import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReeducer';

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
