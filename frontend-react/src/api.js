import axios from 'axios';

const API = axios.create({
  baseURL: 'https://budget-tracker-production-6872.up.railway.app/api'
});

// Automatically attach token to every request
API.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default API;