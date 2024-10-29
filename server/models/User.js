// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Подписчики
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // На кого подписан пользователь
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
