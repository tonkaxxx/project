// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на пользователя
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Дата создания поста
});

module.exports = mongoose.model('Post', PostSchema);
