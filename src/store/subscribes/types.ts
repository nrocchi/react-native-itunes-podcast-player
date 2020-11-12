export interface Subscribe {
  thumbnail: string
  feedUrl: string
  artist: string
  genres: string[]
  name: string
  episodesCount: number
  added: number
}

export const TOGGLE_SUBSCRIBE = 'TOGGLE_SUBSCRIBE'
export const DELETE_SUBSCRIBE = 'DELETE_SUBSCRIBE'
export const SORT_SUBSCRIBE = 'SORT_SUBSCRIBE'

interface ToggleSubscribeAction {
  type: typeof TOGGLE_SUBSCRIBE
  value: Subscribe
}

interface DeleteSubscribeAction {
  type: typeof DELETE_SUBSCRIBE
  value: Subscribe
}

interface SortSubscribeAction {
  type: typeof SORT_SUBSCRIBE
  value: string
}

export type SubscribesActionTypes =
  | ToggleSubscribeAction
  | DeleteSubscribeAction
  | SortSubscribeAction
