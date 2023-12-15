import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;
export const contactFilter = state => state.filter?.filter || '';
export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.loading;

export const getFilter = createSelector([contactFilter], filter => filter);

export const getContacts = createSelector(
  [selectContacts, contactFilter],
  (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
