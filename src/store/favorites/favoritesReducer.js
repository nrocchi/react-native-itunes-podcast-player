const initialState = {favorites: []}

function favoritesReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteIndex = state.favorites.findIndex(
        (item) => item.linkUrl === action.value.linkUrl,
      )
      if (favoriteIndex !== -1) {
        // est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favorites: state.favorites.filter(
            (item, index) => index !== favoriteIndex,
          ),
        }
      } else {
        // n'est pas dans les favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favorites: [action.value, ...state.favorites],
        }
      }
      return nextState || state

    case 'DELETE_FAVORITE':
      const favoriteDeleteIndex = state.favorites.findIndex(
        (item) => item.linkUrl === action.value.linkUrl,
      )
      if (favoriteDeleteIndex !== -1) {
        // est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favorites: state.favorites.filter(
            (item, index) => index !== favoriteDeleteIndex,
          ),
        }
      } else {
        // n'est pas dans les favoris
        return state
      }
      return nextState || state

    case 'SORT_FAVORITE':
      const sortByKey = (key) => (a, b) => (a[key] > b[key] ? 1 : -1)

      nextState = {
        ...state,
        favorites: state.favorites.slice().sort(sortByKey(action.value)),
      }

      return nextState || state

    default:
      return state
  }
}

export default favoritesReducer

// import {
//   TOGGLE_FAVORITE,
//   DELETE_FAVORITE,
//   SORT_FAVORITE,
//   FavoritesActionTypes,
// } from './types'

// const initialState = {subscribes: [], favorites: []}

// function handleFavoritesReducer(
//   state = initialState,
//   action: FavoritesActionTypes | any,
// ): any {
//   let nextState
//   switch (action.type) {
//     case TOGGLE_FAVORITE:
//       const favoriteIndex = state.favorites.findIndex(
//         (item: any) => item.linkUrl === action.value.linkUrl,
//       )
//       if (favoriteIndex !== -1) {
//         // est déjà dans les favoris, on le supprime de la liste
//         nextState = {
//           ...state,
//           favorites: state.favorites.filter(
//             (item, index) => index !== favoriteIndex,
//           ),
//         }
//       } else {
//         // n'est pas dans les favoris, on l'ajoute à la liste
//         nextState = {
//           ...state,
//           favorites: [action.value, ...state.favorites],
//         }
//       }
//       return nextState || state

//     case DELETE_FAVORITE:
//       const favoriteDeleteIndex = state.favorites.findIndex(
//         (item: any) => item.linkUrl === action.value.linkUrl,
//       )
//       if (favoriteDeleteIndex !== -1) {
//         // est déjà dans les favoris, on le supprime de la liste
//         nextState = {
//           ...state,
//           favorites: state.favorites.filter(
//             (item, index) => index !== favoriteDeleteIndex,
//           ),
//         }
//       } else {
//         // n'est pas dans les favoris
//         return state
//       }
//       return nextState || state

//     case SORT_FAVORITE:
//       const sortByKey = (key: any) => (a: any, b: any) =>
//         a[key] > b[key] ? 1 : -1

//       nextState = {
//         ...state,
//         favorites: state.favorites.slice().sort(sortByKey(action.value)),
//       }

//       return nextState || state

//     default:
//       return state
//   }
// }

// export default handleFavoritesReducer
