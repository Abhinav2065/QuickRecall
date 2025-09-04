import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'https://quick-recall-5iox-1ndimj6zo-abhinav2065s-projects.vercel.app//api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include CSRF token if needed
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

export const chatAPI = {
  sendMessage: (message) => api.post('/chat/', { message }),
};

export const flashnotesAPI = {
  createFromText: (text) => api.post('/flashnotes/', { text }),
  createFromFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/flashnotes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const quizAPI = {
  createQuiz: (content) => api.post('/quiz/', { content }),
};

export default api;
