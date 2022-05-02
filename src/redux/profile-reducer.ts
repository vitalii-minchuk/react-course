import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profile-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
  postData: [
    { id: 1, message: "its my first post", likesCount: 124, src: "https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 2, message: "yo yo yo", likesCount: 15, src: "https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 3, message: "hey", likesCount: 1, src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 4, message: "it's nice to see you", likesCount: 5, src: "https://www.stockvault.net/data/2019/03/11/261989/thumb16.jpg" },
    { id: 5, message: "hey", likesCount: 33, src: "https://www.inpixio.com/remove-background/images/main-after.jpg" },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ""
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD_POST":
      let newPost = {
        id: 6,
        message: action.newPostText,
        likesCount: 0,
        src: "https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png"
      }
      return {
        ...state,
        postData: [...state.postData, newPost]
      }
    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        postData: state.postData.filter(p => p.id !== action.postId)
      }
    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile
      }
    case "SN/PROFILE/SET_STATUS":
      return {
        ...state,
        status: action.status
      }
    case "SN/PROFILE/SAVE__PHOTO_SUCCESS":
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: "SN/PROFILE/ADD_POST", newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const),
  setStatus: (status: string) => ({ type: "SN/PROFILE/SET_STATUS", status } as const),
  deletePost: (postId: number) => ({ type: "SN/PROFILE/DELETE_POST", postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: "SN/PROFILE/SAVE__PHOTO_SUCCESS", photos } as const)
}

export const getUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(response))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(response))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
  if (response.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile)
  if (response.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfileThunk(userId))
    } else {
      throw new Error("userId can't be null")
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }))
    return Promise.reject(response.messages[0])
  }
}


export default profileReducer