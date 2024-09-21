import { createSlice } from '@reduxjs/toolkit';
import { logIn, registerUser, logOutUser, currentUser } from './operation';

export const INIT_STATE = {
    user: {
        name: null,
        email: null,
        gender: null,
        avatar: null,
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
};

// data;
// activeTime;
// createdAt;
// email;
// gender;
// name;
// photo;
// recommendedWater;
// token;
// updatedAt;
// verifyByEmail;
// verifyToken;
// weight;
// _id;

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
            .addCase(logOutUser.fulfilled, () => {
                return INIT_STATE;
            });
    },
});
export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
