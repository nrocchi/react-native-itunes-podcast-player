export const toggleSubscribeAction = (subscribe) => ({
  type: 'TOGGLE_SUBSCRIBE',
  value: {...subscribe},
})

export const deleteSubscribeAction = (subscribe) => ({
  type: 'DELETE_SUBSCRIBE',
  value: {...subscribe},
})

export const sortSubscribeAction = (sortType) => ({
  type: 'SORT_SUBSCRIBE',
  value: sortType,
})

// import {
//   Subscribe,
//   TOGGLE_SUBSCRIBE,
//   DELETE_SUBSCRIBE,
//   SORT_SUBSCRIBE,
//   SubscribesActionTypes,
// } from './types'

// export const toggleSubscribeAction = (
//   subscribe: Subscribe,
// ): SubscribesActionTypes => ({
//   type: TOGGLE_SUBSCRIBE,
//   value: {...subscribe},
// })

// export const deleteSubscribeAction = (
//   subscribe: Subscribe,
// ): SubscribesActionTypes => ({
//   type: DELETE_SUBSCRIBE,
//   value: {...subscribe},
// })

// export const sortSubscribeAction = (
//   sortType: string,
// ): SubscribesActionTypes => ({
//   type: SORT_SUBSCRIBE,
//   value: sortType,
// })
