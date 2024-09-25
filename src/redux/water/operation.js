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
            const { data } = await deleteWaterService(recordId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const apiGetWaterDay = createAsyncThunk(
    'water/getWaterDay',
    async (day, thunkAPI) => {
        try {
            const data = await getWaterDayService(day);

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const apiGetWaterMonth = createAsyncThunk(
    'water/getWaterMonth',
    async (date, thunkAPI) => {
        try {
            const { data } = await getWaterMonthService(date);
            console.log(data);
            return data;
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
            const { data } = await addWaterService(newEntry);
            return data;
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
            const { data } = await updateWaterService(newEntry);
            console.log(data);
            return data;
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
