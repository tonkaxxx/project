import React, { useState } from 'react';
import axios from 'axios';
import './UserSearch.css';

const UserSearch = () => {
    const [query, setQuery] = useState(''); // Хранение запроса
    const [results, setResults] = useState([]); // Хранение результатов поиска
    const [loading, setLoading] = useState(false); // Состояние загрузки
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        console.log('Отправляем запрос на поиск:', query); // Логируем поисковый запрос
        try {
            const response = await axios.get(`http://localhost:5000/api/users/search?q=${query}`);
            setResults(response.data);
            setError(null);
        } catch (err) {
            console.error('Ошибка при поиске:', err);
            setError('Ошибка при поиске пользователей');
        }
    };


    return (
        <div className="search-container">
            <h2>Search Users</h2>
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Enter username"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>} {/* Показываем индикатор загрузки */}
            {error && <p className="error-message">{error}</p>} {/* Ошибка */}

            <div className="search-results">
                {results.length > 0 ? (
                    results.map((user) => (
                        <div key={user._id} className="user-result">
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default UserSearch;
