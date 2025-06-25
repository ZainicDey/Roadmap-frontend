import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'https://roadmap-nine-gamma.vercel.app',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // ✅ CORRECT FOR JWT
  }
  return config;
});

export default api;
