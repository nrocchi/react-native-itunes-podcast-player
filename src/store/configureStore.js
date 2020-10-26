import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import toggleFavorite from './reducers/favoriteReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, toggleFavorite)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export {store, persistor}