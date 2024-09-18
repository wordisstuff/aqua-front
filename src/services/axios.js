import axios from 'axios';

export const aquaApi = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});
export const setAuthHeader = token => {
    aquaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
    aquaApi.defaults.headers.common.Authorization = '';
};
