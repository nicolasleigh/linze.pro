import axios from 'axios';

let baseURL = 'http://localhost:8085/api/v1';

if (import.meta.env.PROD) {
  baseURL = 'https://linze.pro/api/v1';
}

export const client = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach the JWT to every request so callers don't have to set the
// Authorization header manually.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
