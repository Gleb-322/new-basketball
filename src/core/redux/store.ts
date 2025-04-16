import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from './userSlice'
import uiReducer from './uiSlice'
import loaderReducer from './loaderSlice'

// persistConfig
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['ui', 'user'],
}

// rootReducer
const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
	loader: loaderReducer,
})

//persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

// persistStore
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
