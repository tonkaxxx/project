// routes/post.js
const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Создание нового поста
router.post('/', authMiddleware, async (req, res) => {
    const { content } = req.body;

    try {
        const newPost = new Post({ user: req.user.id, content });
        await newPost.save();

        // Заполняем данные о пользователе перед возвратом
        const postWithUser = await Post.findById(newPost._id).populate('user', 'username');
        res.status(201).json(postWithUser); // Возвращаем заполненный пост
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение всех постов
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 }); // Сортируем посты по дате
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить все посты пользователя по его ID
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;



module.exports = router;
