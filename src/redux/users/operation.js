import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../helpers/axsiosConfig';

// npm install react-hot-toast
import toast from 'react-hot-toast';

export const getUsers = createAsyncThunk('users/get', async (reduxAPI) => {
    try {
        const response = await axios.get('/users/happy'); // смайлик с библиотеки react-hot-toast (happy)
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return reduxAPI.rejectWithValue(error.message);
    }
});
