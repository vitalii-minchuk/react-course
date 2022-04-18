import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
  postData: [
    {id: 1, message: "its my first post", likesCount: 124, src: "https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 2, message: "yo yo yo", likesCount: 15, src: "https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 3, message: "hey", likesCount: 1, src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 4, message: "gasdfgadfg fdgafgasg", likesCount: 5, src: "https://www.stockvault.net/data/2019/03/11/261989/thumb16.jpg"},
    {id: 5, message: "hey", likesCount: 33, src: "https://www.inpixio.com/remove-background/images/main-after.jpg"},
  ],
  newPostText: "",
  profile: null,
  status: "",
}

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST:
      let newPost = {
        id: 6,
        message: state.newPostText,
        likesCount: 0,
        src: 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png',
      }
      return {
        ...state,
        newPostText: "",
        postData: [...state.postData, newPost],
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
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
    default:
      return state;
  };
};


export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({ type: SET_STATUS, status});
export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  };
};

export const getUserProfileThunk = (userId) => {
  return (dispatch) => {
    userAPI.getProfile(userId).then(response => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};


export default profileReducer;