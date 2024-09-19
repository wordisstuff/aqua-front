import { createSlice } from '@reduxjs/toolkit';
import { logIn, refreshUser, registerUser, logOutUser } from './operation';

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
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(logIn.fulfilled, (state, action) => {
                console.log(action.payload.data);
                console.log(state.isLoggedIn);
                state.user = action.payload.user;
                state.token = action.payload.data.token;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                console.log(state.isLoggedIn);
                state.token = action.payload.token;
                state.user = action.payload;
            })
            .addCase(logOutUser.fulfilled, () => {
                return INIT_STATE;
            });
    },
});
export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
