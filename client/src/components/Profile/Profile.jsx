import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const { userId } = useParams(); // Получаем ID пользователя из URL
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Получаем данные пользователя
                const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(userResponse.data);

                // Получаем посты пользователя
                const postsResponse = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
                setPosts(postsResponse.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных профиля:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h2>{user.username}'s Profile</h2>
            <p>Followers: {user.followers.length}</p> {/* Предположим, что у вас есть поле с подписчиками */}
            <h3>Posts:</h3>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <p><strong>{user.username}</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
