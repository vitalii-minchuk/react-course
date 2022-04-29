import axios from "axios"
import { ProfileType } from "../types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "223a8e86-48fc-45d4-b272-adf11214075e"
  },
});

export const userAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get("users?page=" + currentPage + "&count=" + pageSize)
      .then(response => response.data)
  },
  unfollow(userId: number) {
    return instance.delete("follow/" + userId)
  },
  follow(userId: number) {
    return instance.post("follow/" + userId)
  },
  getProfile(userId: number) {
    console.log("Obsolete method. Please use profileAPI object")
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get("profile/" + userId)
  },
  getStatus(userId: number) {
    return instance.get("profile/status/" + userId)
  },
  updateStatus(status: string) {
    return instance.put("profile/status", { status: status })
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put("profile/photo", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile: ProfileType) {
    return instance.put("profile", profile)
  }
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type AuthMeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodeEnum | ResultCodeForCaptcha
  messages: Array<string>
}

export const authAPI = {
  authMe() {
    return instance.get<AuthMeResponseType>("auth/me").then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>("auth/login", { email, password, rememberMe, captcha })
    .then(res => res.data)
  },
  logout() {
    return instance.delete("auth/login")
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get("security/get-captcha-url")
  }
}

