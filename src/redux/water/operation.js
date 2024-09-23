import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    addWaterService,
    deleteWaterService,
    getWaterDayService,
    getWaterMonthService,
    updateWaterService,
    getWaterStatsService,
} from './services.js';

export const apiDeleteWater = createAsyncThunk(
    'water/deleteWater',
    async (recordId, thunkAPI) => {
        try {
            const response = await deleteWaterService(recordId);
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
            const response = await getWaterDayService(day);
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
            const response = await getWaterMonthService(date);
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
            const response = await addWaterService(newEntry);
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
            const response = await updateWaterService(newEntry);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

//********************************************************************************/

export const apiGetWaterStats = createAsyncThunk(
    'water/getWaterStats',
    async thunkAPI => {
        try {
            const response = await getWaterStatsService();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
