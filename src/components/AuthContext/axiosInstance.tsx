import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'https://sokoni-6ocg.onrender.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;