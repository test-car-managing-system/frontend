import axios from 'axios';

const BASE_URL = 'https://api.testcar.store';
// const BASE_URL = 'http://localhost:8080';

export const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
