// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    userName: localStorage.getItem('userName'),
    logoutSuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.userName = action.payload.userName;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('userName', action.payload.userName);
        },
        logout(state) {
            state.token = null;
            state.role = null;
            state.userName = null;
            state.logoutSuccess = true;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userName');
        },
        resetLogoutSuccess(state) {
            state.logoutSuccess = false;
        },
        syncAuthState(state){
            state.token = localStorage.getItem('token');
            state.role = localStorage.getItem('role');
            state.userName = localStorage.getItem('userName');
        }
    },
});

export const { loginSuccess, logout, resetLogoutSuccess, syncAuthState } = authSlice.actions;
export default authSlice.reducer;
