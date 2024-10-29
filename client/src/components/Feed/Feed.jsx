import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Feed.css';
import PostForm from '../PostForm/PostForm';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.user.userInfo); // Получаем данные текущего пользователя

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Ошибка при получении постов:', error);
            }
        };

        fetchPosts(); // Загружаем посты при первом рендере
    }, []);

    return (
        <div className="feed-container">
            <h2>What's new...</h2>
            <PostForm onPostAdded={(newPost) => setPosts((prevPosts) => [newPost, ...prevPosts])} />
            <div className="posts">
                {posts.length === 0 ? (
                    <p>Нет постов для отображения</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="post">
                            <p>
                                <strong>{post.user?.username || "Неизвестный пользователь"}</strong>{" "}
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <p>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
