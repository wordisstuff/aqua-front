import axios from 'axios';
import { setToken } from '../redux/auth/slice';

// const URLA = 'http://localhost:8080'

// const URLA = 'https://aqua-back.onrender.com';

const URLA = () =>
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://aqua-back.onrender.com';

console.log(URLA());
// Створення екземпляру axios
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
            console.log(response);

            return response;
        },
        async error => {
            if (error.response && error.response.status === 401) {
                console.log(error);

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

// Add global response interceptor

// Функція для перевірки доступності сервера
//        await aquaApi.get('/ping'); // Припустимо, що у вас є маршрут для перевірки
//        return true; // Сервер доступний
//   } catch (error) {
//       console.error('Server is not available:', error);
//        return false; // Сервер недоступний
//    }
//};

// Приклад використання перевірки доступності сервера
//checkServerAvailability().then(isAvailable => {
//    if (!isAvailable) {
//        console.warn(
//            'Using local server due to unavailability of global server.',
//        );
//    }
//});
