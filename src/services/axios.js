import axios from 'axios';

export const aquaApi = axios.create({
    baseURL: 'https://aqua-back.onrender.com',
    // 'http://localhost:8080'
});
export const setAuthHeader = token => {
    aquaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
    aquaApi.defaults.headers.common.Authorization = '';
};
