import axios from 'axios';

export const URL_USER_AUTHENTICATE = '/user/login';
export const BASE_URL = 'http://localhost:7777';
export const URL_REFRESH_TOKEN = '/user/refresh_token';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default apiInstance;
