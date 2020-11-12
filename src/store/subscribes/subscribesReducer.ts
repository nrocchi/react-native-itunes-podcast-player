import {
  Subscribe,
  TOGGLE_SUBSCRIBE,
  DELETE_SUBSCRIBE,
  SORT_SUBSCRIBE,
  SubscribesActionTypes,
  SubscribesState,
} from './types'

const initialState: SubscribesState = {subscribes: []}

function subscribesReducer(
  state = initialState,
  action: SubscribesActionTypes | any,
): SubscribesState {
  let nextState
  switch (action.type) {
    case TOGGLE_SUBSCRIBE:
      const subscribeIndex = state.subscribes.findIndex(
        (item: Subscribe) => item.name === action.value.name,
      )
      if (subscribeIndex !== -1) {
        // est déjà dans les abonnements, on le supprime de la liste
        nextState = {
          ...state,
          subscribes: state.subscribes.filter(
            (item: Subscribe, index: any) => index !== subscribeIndex,
          ),
        }
      } else {
        // n'est pas dans les abonnements, on l'ajoute à la liste
        nextState = {
          ...state,
          subscribes: [action.value, ...state.subscribes],
        }
      }
      return nextState || state

    case DELETE_SUBSCRIBE:
      const subscribeDeleteIndex = state.subscribes.findIndex(
        (item: Subscribe) => item.name === action.value.name,
      )
      if (subscribeDeleteIndex !== -1) {
        // est déjà dans les abonnements, on le supprime de la liste
        nextState = {
          ...state,
          subscribes: state.subscribes.filter(
            (item, index) => index !== subscribeDeleteIndex,
          ),
        }
      } else {
        // n'est pas dans les abonnements
        return state
      }
      return nextState || state

    case SORT_SUBSCRIBE:
      const sortByKey = (key: any) => (a: any, b: any) =>
        a[key] > b[key] ? 1 : -1

      nextState = {
        ...state,
        subscribes: state.subscribes.slice().sort(sortByKey(action.value)),
      }

      return nextState || state

    default:
      return state
  }
}

export default subscribesReducer
