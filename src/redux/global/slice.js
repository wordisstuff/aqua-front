import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = {
    loading: false,
    error: null,
};

const globalSlice = createSlice({
    name: 'global',
    initialState: INIT_STATE,
    extraReducers: builder => {
        builder
            .addMatcher(
                action => action.type.endsWith('pending'),
                handlePending,
                console.log('PENDING'),
            )
            .addMatcher(
                action => action.type.endsWith('rejected'),
                handleRejected,
            )
            .addMatcher(
                action => action.type.endsWith('fulfilled'),
                handleFulfilled,
            );
    },
});

const handlePending = state => {
    state.loading = true;
    state.error = null;
};
const handleFulfilled = state => {
    state.loading = false;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const globalReducer = globalSlice.reducer;
