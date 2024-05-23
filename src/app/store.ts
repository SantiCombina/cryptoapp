import {configureStore} from "@reduxjs/toolkit";

import {cryptoApi} from "../services/crypto-api";
import {cryptoNewsApi} from "../services/crypto-news-api";

export function ConfigureStore() {
    return configureStore({
        reducer: {
            [cryptoApi.reducerPath]: cryptoApi.reducer,
            [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
    });
}
