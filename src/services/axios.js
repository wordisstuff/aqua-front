import axios from 'axios';
import { setToken } from '../redux/auth/slice';

const URLA = () =>
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://aqua-back.onrender.com';

export const aquaApi = axios.create({
    baseURL: URLA(),
    withCredentials: true,
});

// Функція для встановлення заголовка авторизації
export const setAuthHeader = token => {
    aquaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення заголовка авторизації
export const clearAuthHeader = () => {
    delete aquaApi.defaults.headers.common.Authorization;
};

export const initInterceptor = store => {
    aquaApi.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            if (error.response && error.response.status === 401) {
                try {
                    const { data } = await aquaApi.post('auth/refresh');
                    setAuthHeader(data.data.token);
                    store.dispatch(setToken({ token: data.data.token }));
                    error.config.headers['Authorization'] =
                        `Bearer ${data.data.token}`;
                    return aquaApi(error.config);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        },
    );
};
