import {combineReducers, createStore} from 'redux'
import {
  persistCombineReducers,
  persistReducer,
  persistStore,
} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import rootReducer from './index'
import handleFavoritesReducer from './favorites/favoritesReducer'
import handleSubscribesReducer from './subscribes/subscribesReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

// const rootReducer = combineReducers({
//   favoritesReducer,
//   subscribesReducer,
// })

// export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, toggleWatched, setAvatar}))

// const persistedCombinedReducer = persistCombineReducers(persistConfig, {
//   favoritesReducer,
//   subscribesReducer,
// })

const persistedReducer = persistReducer(persistConfig, handleSubscribesReducer)
// const persistedReducer2 = persistReducer(persistConfig, favoritesReducer)

const store = createStore(persistedReducer)
// const store = createStore(
//   persistCombineReducers(persistConfig, {
//     handleFavoritesReducer,
//     handleSubscribesReducer,
//   }),
// )

// const store = createStore(
//   persistCombineReducers(persistConfig, {favoritesReducer, subscribesReducer}),
// )

const persistor = persistStore(store)

export {store, persistor}

// export const configureStore = () => {
//   const store = createStore(persistedReducer)
//   const persistor = persistStore(store)

//   return {store, persistor}
// }
