import axios from 'axios';
import Cookies from 'js-cookie'; // لازم تعمل npm install js-cookie

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // مهم جداً عشان الكوكيز تتبعت مع الريكويست
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token'); // سحب التوكن من الكوكي
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;