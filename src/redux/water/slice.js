import { createSlice } from '@reduxjs/toolkit';
import {
    apiDeleteWater,
    apiGetWaterDay,
    apiGetWaterMonth,
    addWater,
    updateWaterAmount,
} from './operation';

export const INIT_STATE = {
    selectedDate: new Date().toISOString().split('T')[0],
    selectedArreyDate: [],
    errorDay: null,
    isLoadingDay: false,
    selectedMonth: {
        year: new Date().getUTCFullYear(),
        month: new Date().getUTCMonth() + 1,
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

const waterSlice = createSlice({
    name: 'water',
    initialState: INIT_STATE,
    reducers: {
        setDate(state, action) {
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
            })
            .addCase(apiGetWaterDay.fulfilled, (state, action) => {
                state.isLoadingWaterDay = false;
                state.waterPerDay = action.payload.records;
                state.percentDay = action.payload.percentComplete;
            })
            .addCase(updateWaterAmount.fulfilled, (state, action) => {
                const idx = state.waterPerDay.findIndex(
                    water => water._id === action.payload._id,
                );
                state.waterPerDay[idx] = action.payload;
            })
            .addCase(apiDeleteWater.fulfilled, (state, action) => {
                state.waterPerDay = state.waterPerDay.filter(
                    water => water._id !== action.payload._id,
                );
            })

            .addCase(addWater.fulfilled, (state, action) => {
                state.isLoading = false;
                state.waterPerDay = [
                    ...state.waterPerDay,
                    action.payload.newEntry,
                ];
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
