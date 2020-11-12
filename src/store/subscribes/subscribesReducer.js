const initialState = {subscribes: []}

function subscribesReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_SUBSCRIBE':
      const subscribeIndex = state.subscribes.findIndex(
        (item) => item.name === action.value.name,
      )
      if (subscribeIndex !== -1) {
        // est déjà dans les abonnements, on le supprime de la liste
        nextState = {
          ...state,
          subscribes: state.subscribes.filter(
            (item, index) => index !== subscribeIndex,
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

    case 'DELETE_SUBSCRIBE':
      const subscribeDeleteIndex = state.subscribes.findIndex(
        (item) => item.name === action.value.name,
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

    case 'SORT_SUBSCRIBE':
      const sortByKey = (key) => (a, b) => (a[key] > b[key] ? 1 : -1)

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

// import {
//   Subscribe,
//   TOGGLE_SUBSCRIBE,
//   DELETE_SUBSCRIBE,
//   SORT_SUBSCRIBE,
//   SubscribesActionTypes,
// } from './types'

// const initialState: any = {subscribes: [], favorites: []}

// function handleSubscribesReducer(
//   state = initialState,
//   action: SubscribesActionTypes | any,
// ): any {
//   let nextState
//   switch (action.type) {
//     case TOGGLE_SUBSCRIBE:
//       const subscribeIndex = state.subscribes.findIndex(
//         (item: any) => item.name === action.value.name,
//       )
//       if (subscribeIndex !== -1) {
//         // est déjà dans les abonnements, on le supprime de la liste
//         nextState = {
//           ...state,
//           subscribes: state.subscribes.filter(
//             (item: any, index: any) => index !== subscribeIndex,
//           ),
//         }
//       } else {
//         // n'est pas dans les abonnements, on l'ajoute à la liste
//         nextState = {
//           ...state,
//           subscribes: [action.value, ...state.subscribes],
//         }
//       }
//       return nextState || state

//     case DELETE_SUBSCRIBE:
//       const subscribeDeleteIndex = state.subscribes.findIndex(
//         (item: any) => item.name === action.value.name,
//       )
//       if (subscribeDeleteIndex !== -1) {
//         // est déjà dans les abonnements, on le supprime de la liste
//         nextState = {
//           ...state,
//           subscribes: state.subscribes.filter(
//             (item: any, index: any) => index !== subscribeDeleteIndex,
//           ),
//         }
//       } else {
//         // n'est pas dans les abonnements
//         return state
//       }
//       return nextState || state

//     case SORT_SUBSCRIBE:
//       const sortByKey = (key: any) => (a: any, b: any) =>
//         a[key] > b[key] ? 1 : -1

//       nextState = {
//         ...state,
//         subscribes: state.subscribes.slice().sort(sortByKey(action.value)),
//       }

//       return nextState || state

//     default:
//       return state
//   }
// }

// export default handleSubscribesReducer
