import axios from 'axios';

export default axios.create({
  baseURL: 'https://zentaapi.azurewebsites.net/transaction/Index',
  headers: {
    'Content-type': 'application/json',
  },
});
