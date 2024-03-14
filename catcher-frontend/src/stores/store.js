import { configureStore } from '@reduxjs/toolkit'
import { scoreApi } from '../services/scores'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer: {
        [scoreApi.reducerPath]: scoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

setupListeners(store.dispatch)