// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Функция для логина
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    return response.data;
};

// Функция для получения информации о пользователе
export const fetchUser = async () => {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
};
