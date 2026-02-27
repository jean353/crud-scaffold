import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LARAVEL_URL ?? 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10_000,
});

export default api;
