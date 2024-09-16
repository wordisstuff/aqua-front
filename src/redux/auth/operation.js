import { createAsyncThunk } from '@reduxjs/toolkit';
import { aquaApi, setToken } from '../../services/axios.js';
import toast from 'react-hot-toast';

export const registerUser = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await aquaApi.post('/auth/signup', formData);
            // setToken(data.token);
            toast.success(data.message);
            console.log(data);
            return data;
        } catch (e) {
            console.log(e.response.data);
            toast.error(e.response.data.data.message);
            return rejectWithValue(e.message);
        }
    },
);

export const logIn = createAsyncThunk(
    'auth/signin',
    async (formData, thunkAPI) => {
        try {
            const { data } = await aquaApi.post('/auth/signin', formData);
            setToken(data.token);
            toast.success(data.message);

            const profileRes = await aquaApi.get('/users/profile');

            return data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        try {
            setAuthHeader(persistedToken);
            const res = await axios.get('/users/profile');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const logOutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('users/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
