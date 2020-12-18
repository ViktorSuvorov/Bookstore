/* eslint-disable import/prefer-default-export */

import axios from '../indexApi';

const path = 'user/';

export const userLoginApi = (email, password) => (
  axios({
    method: 'POST',
    url: `${path}login`,
    data: { email, password },
  })
);

export const userRegisterApi = (name, email, password) => (
  axios({
    method: 'POST',
    url: `${path}register`,
    data: { name, email, password },
  })
);

export const userGetProfileApi = (id, getState) => {
  const { userLogin: { userInfo } } = getState();
  return (axios({
    url: `${path}${id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }));
};

export const updateUserProfileApi = (user, getState) => {
  const { userLogin: { userInfo } } = getState();
  return (axios({
    method: 'PUT',
    url: `${path}profile`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: user,
  }));
};

export const getUsersListApi = (getState) => {
  const { userLogin: { userInfo } } = getState();
  return (axios({
    url: `${path}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }));
};

export const deleteUserByIdApi = (id, getState) => {
  const { userLogin: { userInfo } } = getState();
  return (axios({
    method: 'DELETE',
    url: `${path}${id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: { id },
  }));
};

export const updateUserProfileByAdminApi = (user, getState) => {
  const { userLogin: { userInfo } } = getState();
  return (axios({
    method: 'PUT',
    url: `${path}${user.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: user,
  }));
};
