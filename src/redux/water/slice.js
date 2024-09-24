import { createSlice } from '@reduxjs/toolkit';
import {
    apiDeleteWater,
    apiGetWaterDay,
    apiGetWaterMonth,
    addWater,
    updateWaterAmount,
} from './operation';
import { tooltipClasses } from '@mui/material';

export const INIT_STATE = {
    selectedDate: null,
    selectedArreyDate: [],
    errorDay: null,
    isLoadingDay: false,
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
    monthData: [],
    errorMonth: null,
    isLoadingMonth: false,
    waterPerDay: [],
    percentDay: null,
    errorWaterDay: null,
    isLoadingWaterDay: false,
    entries: [],
    loading: false,
    error: null,
};

// Общие обработчики состояний
const handlePending = state => {
    state.loading = true;
    state.error = null;
};
const handleFulfilled = state => {
    state.loading = false;
    state.error = null;
};
const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

// Основной slice
const waterSlice = createSlice({
    name: 'water',
    initialState: INIT_STATE,
    reducers: {
        setDate(state, action) {
            console.log('action', action);
            state.selectedDate = action.payload;
        },
        increaseMonth(state) {
            const newMonth = state.selectedMonth.month + 1;
            if (newMonth > 12) {
                state.selectedMonth.month = 1;
                state.selectedMonth.year += 1;
            } else {
                state.selectedMonth.month = newMonth;
            }
        },
        decreaseMonth(state) {
            const newMonth = state.selectedMonth.month - 1;
            if (newMonth < 1) {
                state.selectedMonth.month = 12;
                state.selectedMonth.year -= 1;
            } else {
                state.selectedMonth.month = newMonth;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(apiGetWaterMonth.fulfilled, (state, action) => {
                state.isLoadingMonth = false;
                state.monthData = action.payload;
            })
            .addCase(apiGetWaterDay.fulfilled, (state, action) => {
                console.log(action.payload.records);
                state.isLoadingWaterDay = false;
                state.waterPerDay = action.payload.records;
                state.percentDay = action.payload.percentComplete;
            })
            .addCase(updateWaterAmount.fulfilled, (state, action) => {
                const index = state.entries.findIndex(
                    entry => entry.id === action.payload.id,
                );
                if (index !== -1) state.entries[index] = action.payload;
            })
            .addCase(apiDeleteWater.fulfilled, (state, action) => {
                state.waterDay = state.waterDay.filter(
                    entry => entry._id !== action.payload.id,
                );
            })
            .addCase(addWater.fulfilled, (state, action) => {
                console.log(state.selectedDate);
                state.isLoading = false;
                state.waterDay = [...state.waterDay, action.payload];
            })
            .addMatcher(
                action => action.type.endsWith('pending'),
                handlePending,
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

export const { increaseMonth, decreaseMonth, setDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
