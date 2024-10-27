// frontend/api/axiosInstance.js
import axios from 'axios';
import { API_URL } from '@env'; // Import the API_URL environment variable

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add token to request headers if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage or state
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export default axiosInstance;
