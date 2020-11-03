const initialState = {favorites: []}

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const SORT_FAVORITE = 'SORT_FAVORITE'

function favoriteReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case TOGGLE_FAVORITE:
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

    case DELETE_FAVORITE:
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

    case SORT_FAVORITE:
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

export default favoriteReducer
