import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Interceptor to attach Bearer token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('capacity_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
