import axios from 'axios';

const urla = () => process.env.SERVER === 'globalNO'?'http://localhost:8080':'https://aqua-back.onrender.com'
export const aquaApi = axios.create({
    baseURL: urla(),
    withCredentials: true,
});
export const setAuthHeader = token => {
    aquaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    aquaApi.defaults.headers.common.Authorization = '';
};
