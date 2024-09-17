import { createSlice } from '@reduxjs/toolkit';
import { logIn, refreshUser, registerUser } from './operation';

export const INIT_STATE = {
    user: {
        name: null,
        email: null,
        gender: null,
        avatar: null,
        weight: null,
        activeTime: null,
        waterRate: null,
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
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                console.log(action.payload);
                console.log(state.isLoggedIn);
                state.isLoggedIn = true;
                console.log(state.isLoggedIn);
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            });
        //         .addCase(logout.fulfilled, () => {
        //             return INIT_STATE;
        //         });
    },
});
export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
