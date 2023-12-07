import axios from 'axios';

const BASE_URL = 'https://api.testcar.store';

export const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
