import { createSlice } from '@reduxjs/toolkit';

export const INIT_STATE = {
    selectedDate: new Date().toISOString().split('T')[0],
    selectedArreyDate: [],
    errorDay: null,
    isLoadingDay: false,
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
};

const waterSlice = createSlice({
    name: 'water',
    initialState: INIT_STATE,
});

export const waterReducer = waterSlice.reducer;
