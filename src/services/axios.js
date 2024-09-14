import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-track-api.onrender.com';

export const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export default axios;
