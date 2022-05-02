import { FormAction, stopSubmit } from "redux-form"
import { ResultCodeEnum, ResultCodeForCaptcha } from "../api/api"
import { authAPI } from "../api/auth-api"
import { securityAPI } from "../api/security-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string
};

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
    case "SN/AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const actions = {
  getCaptchaUrlSuccess: (captchaUrl: string) => ({type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}} as const),
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean) => ({ type: "SN/AUTH/SET_USER_DATA",
      payload: { userId, email, login, isAuth }} as const)
}

export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
  let authMeData = await authAPI.authMe()
  if (authMeData.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = authMeData.data;
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
};

export const login = (email: string,
    password: string,
    rememberMe: boolean,
    captcha: string): ThunkType => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha)
  if (loginData.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserDataThunk())
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "ERROR"
    dispatch(stopSubmit("login", { _error: message }))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer