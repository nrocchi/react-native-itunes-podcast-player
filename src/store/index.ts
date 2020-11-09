import {combineReducers} from 'redux'

import favoritesReducer from './favorites/favoritesReducer'
import subscribesReducer from './subscribes/subscribesReducer'

const rootReducer = combineReducers({
  favoritesReducer,
  subscribesReducer,
})

export default rootReducer
