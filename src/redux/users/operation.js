import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { aquaApi } from '../../services/axios';
export const getUsers = createAsyncThunk('users', async reduxAPI => {
    try {
        const res = await aquaApi.get('/users');
        console.log(res)
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return reduxAPI.rejectWithValue(error.message);
    }
});
