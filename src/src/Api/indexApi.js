import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: localStorage.token,
});

export default async ({
  method = 'GET',
  baseURL = `${BASE_URL}/api/`,
  url = '',
  params = {},
  headers = {},
  data = {},
}) => {
  try {
    const response = await axios({
      method,
      url: `${baseURL}${url}`,
      params,
      headers: {
        ...getDefaultHeaders(),
        ...headers,
      },
      data,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
