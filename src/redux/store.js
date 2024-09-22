import { authReducer } from './auth/slice';
import { waterReducer } from './water/slice';
import { usersReducer } from './users/slice';

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { globalReducer } from './global/slice';
import { initInterceptor } from '../services/axios';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
};

const waterPersistConfig = {
    key: 'water',
    storage,
    whitelist: [
        'selectedDate',
        'selectedDateData',
        'selectedMonth',
        'monthData',
        'toggleInfo',
    ],
};

const persistedAuth = persistReducer(authPersistConfig, authReducer);
const persistedWater = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
    reducer: {
        global: globalReducer,
        auth: persistedAuth,
        water: persistedWater,
        users: usersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
initInterceptor(store);
export const persistor = persistStore(store);
