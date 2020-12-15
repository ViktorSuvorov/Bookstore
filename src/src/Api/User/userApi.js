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
