
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './userSlice';
import productSlice from './productSlice';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
  user:userSlice,
  product:productSlice
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer
})

export const persistor = persistStore(store)





