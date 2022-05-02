import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE__PHOTO_SUCCESS = 'SAVE__PHOTO_SUCCESS';

let initialState = {
  postData: [
    { id: 1, message: "its my first post", likesCount: 124, src: "https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 2, message: "yo yo yo", likesCount: 15, src: "https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 3, message: "hey", likesCount: 1, src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 4, message: "it's nice to see you", likesCount: 5, src: "https://www.stockvault.net/data/2019/03/11/261989/thumb16.jpg" },
    { id: 5, message: "hey", likesCount: 33, src: "https://www.inpixio.com/remove-background/images/main-after.jpg" },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 6,
        message: action.newPostText,
        likesCount: 0,
        src: 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png',
      }
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter(p => p.id !== action.postId),
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE__PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType,
      };
    default:
      return state;
  };
};

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotoSuccessActionType = {
  type: typeof SAVE__PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE__PHOTO_SUCCESS, photos });

export const getUserProfileThunk = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.resultCode === 0) {
    dispatch(getUserProfileThunk(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }));
    return Promise.reject(response.messages[0]);
  }
};


export default profileReducer;