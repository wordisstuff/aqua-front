import axios from 'axios';

export const aquaApi = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    baseURL: 'http://localhost:8080' || 'https://aqua-back.onrender.com',
});
export const setAuthHeader = token => {
    aquaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    aquaApi.defaults.headers.common.Authorization = '';
};
