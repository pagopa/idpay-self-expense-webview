import axios from 'axios';
import { clearAuthToken } from '../hooks/useJwt';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'it-IT'
  },
});

api.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authToken');
    const parsedToken = authToken ? JSON.parse(authToken) : null;
    const localStorageToken = parsedToken ? parsedToken.access_token : null;
    if (localStorageToken) {
      config.headers.Authorization = `Bearer ${localStorageToken}`
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    window.location.href = '/error'
    return Promise.reject(error);
  }
);

export default api;