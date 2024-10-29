// routes/user.js
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

// Получение данных пользователя по ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('followers', 'username') // Добавляем данные о подписчиках
            .populate('following', 'username'); // Добавляем данные о подписках
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение постов пользователя
router.get('/:userId/posts', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q; // Получаем поисковый запрос из query параметра
    console.log('Поисковый запрос:', query); // Логируем запрос

    // Проверяем наличие поискового запроса
    if (!query) {
        console.log('Параметр поиска отсутствует'); // Логируем ошибку
        return res.status(400).json({ message: 'Параметр поиска отсутствует' });
    }

    try {
        // Ищем пользователей по имени пользователя (username)
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        console.log('Найдено пользователей:', users.length); // Логируем количество найденных пользователей
        res.status(200).json(users); // Возвращаем найденных пользователей
    } catch (err) {
        console.error('Ошибка при поиске пользователей:', err);
        res.status(500).json({ message: 'Ошибка при поиске пользователей', error: err.message });
    }
});




module.exports = router;
