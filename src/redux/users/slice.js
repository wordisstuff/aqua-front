import { createSlice } from '@reduxjs/toolkit';
import { currentUser, getUsers } from './operation';

export const INIT_STATE = {
    count: null,
    error: null,
    loading: null,
    photo: [],
};

const handlePending = state => {
    state.loading = true;
    state.error = null;
};
const usersSlice = createSlice({
    name: 'users',
    initialState: INIT_STATE,
    extraReducers: builder => {
        builder.addCase(currentUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        });
        //         .addCase(getUsers.pending, handlePending)
        //         .addCase(getUsers.fulfilled, (state, action) => {
        //             state.count = action.payload.count;
        //             state.avatars = action.payload.avatars;
        //             state.loading = false;
        //         })
        //         .addCase(getUsers.rejected, (state, action) => {
        //             state.error = action.payload;
        //             state.loading = false;
        //         });
    },
});

export const usersReducer = usersSlice.reducer;
