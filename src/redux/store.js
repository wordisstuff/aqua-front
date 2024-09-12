import { authReducer } from './auth/slice';
import { waterReducer } from './water/slice';
import { usersReducer } from './users/slice';
import { setupAxiosInterceptors } from './auth/operation';

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

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        water: persistedWaterReducer,
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

setupAxiosInterceptors(store);

export const persistor = persistStore(store);
