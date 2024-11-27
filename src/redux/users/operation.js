import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { aquaApi } from '../../services/axios';
export const getUsers = createAsyncThunk('users', async reduxAPI => {
    try {
        const { data } = await aquaApi.get('/users');
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        return reduxAPI.rejectWithValue(error.message);
    }
});
