// src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) return;

        try {
            const response = await axios.post('http://localhost:5000/api/posts', { content }, { withCredentials: true });
            onPostAdded(response.data); // Передаем созданный пост в родительский компонент
            setContent(''); // Очищаем поле ввода
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Что нового?"
                required
            />
            <button type="submit">Добавить пост</button>
        </form>
    );
};

export default PostForm;
