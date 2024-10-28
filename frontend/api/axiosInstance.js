import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL, // Use process.env for the environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add token to request headers if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
