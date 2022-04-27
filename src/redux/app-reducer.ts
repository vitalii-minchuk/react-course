import { getAuthUserDataThunk } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
  initialized: boolean;
}

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state: initialStateType = initialState,
    action: any): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  };
};

type InitializationSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializationSuccess = (): InitializationSuccessActionType => ({
  type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserDataThunk());
  
  Promise.all([promise]).then(() => {
    dispatch(initializationSuccess());
  });
};

export default appReducer;