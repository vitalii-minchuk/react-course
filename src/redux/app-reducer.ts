import { getAuthUserDataThunk } from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

let initialState = {
  initialized: false
}

export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState,
    action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export const actions = {
  initializationSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserDataThunk());
  
  Promise.all([promise]).then(() => {
    dispatch(actions.initializationSuccess());
  });
};

export default appReducer;