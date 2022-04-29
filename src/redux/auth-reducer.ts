import { authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string,
};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  };
};

type SetAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth }
  }
);

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (
  captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
  }
);

export const getAuthUserDataThunk = () => async (dispatch: any) => {
  let authMeData = await authAPI.authMe();
  if (authMeData.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = authMeData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string,
    password: string,
    rememberMe: boolean,
    captcha: string) => async (dispatch: any) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserDataThunk());
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "ERROR"
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;