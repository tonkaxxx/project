// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Получаем токен из куки
    if (!token) return res.status(401).json({ error: 'Не авторизован' });

    try {
        const decoded = jwt.verify(token, 'secretKey'); // Проверяем токен
        req.user = decoded; // Сохраняем данные пользователя в объекте запроса
        next(); // Переходим к следующему middleware или обработчику маршрута
    } catch (error) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
};

module.exports = authMiddleware;
