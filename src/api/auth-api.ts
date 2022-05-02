import { instance, ApiResponseType, ResultCodeEnum, ResultCodeForCaptcha } from "./api"

type AuthMeResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  authMe() {
    return instance.get<ApiResponseType<AuthMeResponseDataType>>("auth/me").then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<ApiResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha>>("auth/login", { email, password, rememberMe, captcha })
      .then(res => res.data)
  },
  logout() {
    return instance.delete("auth/login").then(res => res.data)
  }
}
