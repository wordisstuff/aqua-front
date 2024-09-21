import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    aquaApi,
    setAuthHeader,
    clearAuthHeader,
} from '../../services/axios.js';
import { toast } from 'react-hot-toast';
import { setToken } from './slice.js';

export const checkEmail = createAsyncThunk(
    'auth/send-reset-email',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://localhost:8080/auth/send-reset-email',
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
    'auth/reset-pwd',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://localhost:8080/auth/reset-pwd',
                {
                    method: 'POST',
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
            return;
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
            console.log(data.data.token);
            setAuthHeader(data.data.token);
            toast.success(data.message);
            console.log(data.message);
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
            await aquaApi.post('/auth/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, { getState, rejectWithValue }) => {
        const { auth, dispatch } = getState();
        const token = auth.token;
        console.log(token);
        if (!token) {
            return rejectWithValue('Unable user');
        }
        try {
            setAuthHeader(token);
            const { data } = await aquaApi.get('/auth/refresh');
            // console.log('SERVER USER DATA', res);
            // dispatch(setToken({ token: data.token }));
            return res;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
