import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

// Games API
export const getGames = (params) => api.get('/games', { params });
export const getGameById = (id) => api.get(`/games/${id}`);
export const createGame = (data) => api.post('/games', data);
export const updateGame = (id, data) => api.put(`/games/${id}`, data);
export const deleteGame = (id) => api.delete(`/games/${id}`);

// Orders API
export const purchaseGame = (gameId) => api.post(`/orders/purchase/${gameId}`);

// Users API
export const getUserProfile = (userId) => api.get(`/users/profile/${userId}`);
export const updateMyProfile = (data) => api.put('/users/me', data);

export default api;
