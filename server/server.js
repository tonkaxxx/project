const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Импортируем пакет cors
const cookieParser = require('cookie-parser'); // Импортируем пакет cookie-parser

const app = express();  // создаем экземпляр приложения Express
const PORT = process.env.PORT || 5000;  // задаем порт, на котором будет работать сервер

// Middleware для обработки JSON
app.use(express.json());  // добавьте этот код до определения маршрутов

// Middleware для обработки куки
app.use(cookieParser()); // Подключаем middleware для обработки куки

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем только наш фронтенд
    credentials: true, // Если вы используете куки, вам может понадобиться это
}));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/post'); // Импортируем маршруты для постов
app.use('/api/posts', postRoutes); // Определяем маршрут для постов

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetwork', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB подключена'))
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
        process.exit(1); // Завершить процесс, если MongoDB не подключена
    });

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);  // Выводим полную трассировку ошибки
    res.status(500).send('Something broke!');  // Возвращаем ошибку клиенту
});