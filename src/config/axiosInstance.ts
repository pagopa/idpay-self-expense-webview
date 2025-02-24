import axios from 'axios';
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
    const basename = import.meta.env.MODE === "development" ? "/" : "/ricevute/";
    localStorage.clear();
    window.location.href = `${basename}error`;
    return Promise.reject(error);
  }
);

export default api;