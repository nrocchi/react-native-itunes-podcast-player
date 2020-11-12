import {createStore} from 'redux'
import {persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import favoritesReducer from './favorites/favoritesReducer'
import subscribesReducer from './subscribes/subscribesReducer'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

export default createStore(
  persistCombineReducers(rootPersistConfig, {
    favoritesReducer,
    subscribesReducer,
  }),
)
