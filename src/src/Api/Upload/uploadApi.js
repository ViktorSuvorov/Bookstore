/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'upload';

export const uploadBookImage = (formData) => (
  axios({
    method: 'POST',
    url: `${path}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
);
