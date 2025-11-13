
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './userSlice';
import productSlice from './productSlice';
import orderSlice from './orderSlice';
import cartSlice from './cartSlice';

const rootReducer = combineReducers({
  user:userSlice,
  product:productSlice,
  order:orderSlice,
  cartSlice:cartSlice
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





