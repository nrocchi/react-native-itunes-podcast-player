import {
  Favorite,
  TOGGLE_FAVORITE,
  DELETE_FAVORITE,
  SORT_FAVORITE,
  FavoritesActionTypes,
} from './types'

export const toggleFavoriteAction = (
  favorite: Favorite,
): FavoritesActionTypes => ({
  type: TOGGLE_FAVORITE,
  value: {...favorite},
})

export const deleteFavoriteAction = (
  favorite: Favorite,
): FavoritesActionTypes => ({
  type: DELETE_FAVORITE,
  value: {...favorite},
})

export const sortFavoriteAction = (sortType: string): FavoritesActionTypes => ({
  type: SORT_FAVORITE,
  value: sortType,
})
