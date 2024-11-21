import { createSlice } from '@reduxjs/toolkit';
import {
    logIn,
    registerUser,
    logOutUser,
    currentUser,
    updateUser,
    googleLogin,
    googleRedirect,
} from './operation';

export const INIT_STATE = {
    user: {
        name: null,
        email: null,
        gender: null,
        photo: null,
        weight: null,
        activeTime: null,
        recommendedWater: null,
        verifyByEmail: false,
    },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
    googleUrl: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INIT_STATE,
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
            // state.refreshToken = action.payload.refreshToken;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(logIn.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(currentUser.pending, (state, action) => {
                state.isRefreshing = true;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.isRefreshing = false;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.isRefreshing = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action.payload.user);
                state.user = action.payload.user;
            })
            .addCase(logOutUser.fulfilled, () => {
                return INIT_STATE;
            })
            .addCase(googleRedirect.fulfilled, (state, action) => {
                console.log(action.payload);
                state.googleUrl = action.payload;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = { ...state.user, ...action.payload.user };
                state.token = action.payload.token;
                state.user.verifyByEmail = true;
                state.isLoggedIn = true;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
