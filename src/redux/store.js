import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contacts/sliceContact';
import { filterReducer } from './contacts/sliceFilter';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});

export default store;
