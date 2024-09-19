import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../helpers/axsiosConfig';

// npm install react-hot-toast
import toast from 'react-hot-toast';
import { aquaApi, setAuthHeader } from '../../services/axios';

export const currentUser = createAsyncThunk(
    'user/curent',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            setAuthHeader(token);
            const { data } = await aquaApi.get('/user/current');
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);
export const getUsers = createAsyncThunk('users/get', async reduxAPI => {
    try {
        const response = await axios.get('/users/happy'); // смайлик с библиотеки react-hot-toast (happy)
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return reduxAPI.rejectWithValue(error.message);
    }
});
