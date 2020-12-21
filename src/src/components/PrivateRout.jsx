/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Route
        {...rest}
        render={(props) => (userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        ))}
      />
    </>
  );
};
