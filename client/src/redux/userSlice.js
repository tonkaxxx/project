import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false, // По умолчанию не аутентифицирован
        userInfo: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true; // Пользователь аутентифицирован
            state.userInfo = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false; // Убираем аутентификацию
            state.userInfo = null; // Очищаем информацию о пользователе
        },
        setUser(state, action) {
            state.userInfo = action.payload;
        },
    },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
