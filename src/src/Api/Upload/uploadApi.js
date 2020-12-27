import axios from '../indexApi';

const path = 'upload';

const uploadImage = (formData) => axios({
  method: 'POST',
  url: `${path}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
});

export default uploadImage;
