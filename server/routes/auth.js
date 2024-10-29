const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        // Сохраняем пользователя в базе данных
        await newUser.save();
        res.status(201).json({ message: 'Пользователь создан' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Вход
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Неверный пароль' });

        // Создаем JWT токен
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

        // Отправляем токен в куки (HTTP-only куки для безопасности)
        res.cookie('token', token, {
            httpOnly: true, // недоступно для JS на клиенте
            secure: false,  // для разработки ставим false, на продакшене ставим true
            sameSite: 'strict', // защита от CSRF
            maxAge: 3600000 // 1 час
        });

        res.json({ message: 'Вход успешен' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение данных текущего пользователя по токену
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Ищем пользователя по ID из токена
        const user = await User.findById(req.user.id).select('-password'); // Убираем поле с паролем
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


// Выход (очищаем куки)
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Вы успешно вышли из системы' });
});


module.exports = router;
