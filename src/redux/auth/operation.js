import { createAsyncThunk } from '@reduxjs/toolkit';
import { aquaApi, setAuthHeader } from '../../services/axios.js';
import { toast } from 'react-hot-toast';
import { setToken } from './slice.js';

export const checkEmail = createAsyncThunk(
    'auth/checkEmail',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://aqua-back.onrender.com/auth/check-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                },
            );

            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://aqua-back.onrender.com/auth/reset-password',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                },
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error('Unexpected response status');
            }

            return data;
        } catch (error) {
            toast.error(
                error.response ? error.response.data.message : 'Error occurred',
            );
            return rejectWithValue(error.message);
        }
    },
);

export const registerUser = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await aquaApi.post('/auth/signup', formData);
            toast.success(data.message);
            return data;
        } catch (e) {
            toast.error(e.response.data.data.message);
            return rejectWithValue(e.message);
        }
    },
);

export const logIn = createAsyncThunk(
    'auth/signin',
    async (formData, thunkAPI) => {
        console.log(formData);
        try {
            const { data } = await aquaApi.post('/auth/signin', formData);
            console.log(data);
            setAuthHeader(data.token);
            toast.success(message);
            console.log(data.message);
            // const profileRes = await aquaApi.get('/users/profile');
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const logOutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        // setToken(data.token);
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
