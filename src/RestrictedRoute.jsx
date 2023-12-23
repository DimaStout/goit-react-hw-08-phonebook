// Оновлений код
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './redux/auth/authSelectors';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : <Component />;
};
