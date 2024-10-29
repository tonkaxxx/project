import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice'; // Импортируем действие logout
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Для навигации после выхода
    const user = useSelector((state) => state.user.userInfo);

    const handleLogout = async () => {
        try {
            // Отправляем запрос на сервер для удаления токена из cookies
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

            // Очищаем состояние пользователя в Redux
            dispatch(logout());

            // Перенаправляем на страницу логина
            navigate('/login');
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/messages">Messages</Link></li>
                {user ? (
                    <li><Link to={`/profile/${user._id}`}>Profile</Link></li>
                ) : (
                    <li><span>Loading user profile...</span></li>
                )}
                <li>
                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
