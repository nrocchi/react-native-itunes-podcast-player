export interface Favorite {
  title: string
  description: string
  image: string | null
  linkUrl: string
  summary: string
  text: string
  author: string
  duration: string
  pubDate: string
  thumbnail: string
  podcastName: string
  added: number
}

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const SORT_FAVORITE = 'SORT_FAVORITE'

interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE
  value: Favorite
}

interface DeleteFavoriteAction {
  type: typeof DELETE_FAVORITE
  value: Favorite
}

interface SortFavoriteAction {
  type: typeof SORT_FAVORITE
  value: string
}

export type FavoritesActionTypes =
  | ToggleFavoriteAction
  | DeleteFavoriteAction
  | SortFavoriteAction
