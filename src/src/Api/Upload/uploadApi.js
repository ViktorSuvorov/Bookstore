/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'upload';

export const uploadImage = (formData) => (
  axios({
    method: 'POST',
    url: `${path}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
);
