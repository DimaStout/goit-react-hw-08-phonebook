import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './sliceContact';
import { filterReducer } from './sliceFilter';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});

export default store;
