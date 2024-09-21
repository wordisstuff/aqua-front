import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    requestAddWater as fetchAddWater, // Переименовал requestAddWater
    requestDeleteWater as fetchDeleteWater, // Переименовал requestDeleteWater
    requestGetWaterDay as fetchGetWaterDay, // Переименовал requestGetWaterDay
    requestGetWaterMonth as fetchGetWaterMonth, // Переименовал requestGetWaterMonth
    requestUpdateWater as fetchUpdateWater, // Переименовал requestUpdateWater
    requestGetWaterStats as fetchGetWaterStats, // Переименовал requestGetWaterStats
} from './services.js';

export const apiDeleteWater = createAsyncThunk(
    'water/deleteWater',
    async (recordId, thunkAPI) => {
        try {
            const response = await fetchDeleteWater(recordId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const apiGetWaterDay = createAsyncThunk(
    'water/getWaterDay',
    async (day, thunkAPI) => {
        try {
            const response = await fetchGetWaterDay(day);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const apiGetWaterMonth = createAsyncThunk(
    'water/getWaterMonth',
    async (date, thunkAPI) => {
        try {
            const response = await fetchGetWaterMonth(date);
            return response.daysInMonth;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

//********************************************************************************/

export const addWater = createAsyncThunk(
    'water/addWater',
    async (newEntry, thunkAPI) => {
        try {
            const response = await fetchAddWater(newEntry);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

//********************************************************************************/

export const updateWaterAmount = createAsyncThunk(
    'water/updateWaterAmount',
    async (newEntry, thunkAPI) => {
        try {
            const response = await fetchUpdateWater(newEntry);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

//********************************************************************************/

export const apiGetWaterStats = createAsyncThunk(
    'water/getWaterStats',
    async (thunkAPI) => {
        try {
            const response = await fetchGetWaterStats();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);