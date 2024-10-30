import axios from 'axios';
import { API_URL} from '../config';

const axiosInstance = axios.create({
    baseURL: API_URL, // Use API_URL directly
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
