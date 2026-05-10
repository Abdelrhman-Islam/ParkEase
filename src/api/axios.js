import axios from 'axios';
console.log("My API URL is:", import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
    // ده العنوان اللي هتغيره لما ترفع على السيرفر
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor عشان يضيف التوكن في كل ريكويست لوحده
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;