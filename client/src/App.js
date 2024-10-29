// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import Profile from './components/Profile/Profile';
import UserSearch from './components/UserSearch/UserSearch'; // Подключаем компонент поиска
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from './redux/userSlice';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
                if (res.data) {
                    dispatch(login(res.data));
                }
            } catch (err) {
                console.error('Ошибка при проверке авторизации:', err);
            }
        };

        checkAuth();
    }, [dispatch]);

    return (
        <Router>
            <div className="app-container">
                {isAuthenticated && <Navbar />}
                <div className="main">
                    <Routes>
                        {!isAuthenticated ? (
                            <>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<Feed />} />
                                <Route path="/profile/:userId" element={<Profile />} />
                                <Route path="/search" element={<UserSearch />} /> {/* Маршрут для поиска */}
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
