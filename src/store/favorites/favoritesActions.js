import {
  TOGGLE_FAVORITE,
  DELETE_FAVORITE,
  SORT_FAVORITE,
} from './favoritesReducer'

export const toggleFavoriteAction = (favorite) => ({
  type: TOGGLE_FAVORITE,
  value: {...favorite},
})

export const deleteFavoriteAction = (favorite) => ({
  type: DELETE_FAVORITE,
  value: {...favorite},
})

export const sortFavoriteAction = (sortType) => ({
  type: SORT_FAVORITE,
  value: sortType,
})
