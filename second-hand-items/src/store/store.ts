import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import documentsReducer from './reducers/documentsReducer';
import filterReducer from './reducers/filterReducer';

export default configureStore({
  reducer: {
    app: appReducer,
    documents: documentsReducer,
    filter: filterReducer,
  },
});
