import axios from 'axios';

// Конфігурація базового URL на основі середовища
const getBaseURL = () => {
    // Змінна SERVER визначена в конфігураційному файлі
    const SERVER = 'globalYES'; // Змініть це на 'globalYES' у реальному проекті
    return SERVER === 'globalYES'
        ? 'http://localhost:8080'
        : 'https://aqua-back.onrender.com';
};

// Створення екземпляру axios
export const aquaApi = axios.create({
    baseURL: getBaseURL(),
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
