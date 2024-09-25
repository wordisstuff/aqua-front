import { createSlice } from '@reduxjs/toolkit';
import {
    apiDeleteWater,
    apiGetWaterDay,
    apiGetWaterMonth,
    addWater,
    updateWaterAmount,
} from './operation';
import { tooltipClasses } from '@mui/material';
import { format } from 'date-fns';

export const INIT_STATE = {
    selectedDate: format(new Date(), 'yyyy-MM'),
    selectedArreyDate: [],
    errorDay: null,
    isLoadingDay: false,
    selectedMonth: {
        year: null,
        month: null,
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
        setMonth(state, action) {
            state.selectedMonth = action.payload;
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
                console.log(action.payload);
            })
            .addCase(apiGetWaterDay.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoadingWaterDay = false;
                state.waterPerDay = action.payload.records;
                state.percentDay = action.payload.percentComplete;
            })
            .addCase(updateWaterAmount.fulfilled, (state, action) => {
                console.log(action.payload);
                const idx = state.waterPerDay.findIndex(
                    water => water._id === action.payload._id,
                );
                state.waterPerDay[idx] = action.payload;
            })
            .addCase(apiDeleteWater.fulfilled, (state, action) => {
                console.log(action.payload);
                state.waterPerDay = state.waterPerDay.filter(
                    water => water._id !== action.payload._id,
                );
            })
            .addCase(addWater.fulfilled, (state, action) => {
                console.log(state.selectedDate);
                console.log(action.payload);
                state.isLoading = false;
                state.waterPerDay = [...state.waterPerDay, action.payload];
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

export const { increaseMonth, decreaseMonth, setDate, setMonth } =
    waterSlice.actions;
export const waterReducer = waterSlice.reducer;
