import { Dispatch } from "react"
import { ApiResponseType } from "../api/api"
import { userAPI } from "../api/users-api"
import { UserType } from "../types/types"
import { AppStateType, BaseThunkType } from "./redux-store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'SET_FILTER'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 20 ,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case SET_FILTER:
      return { ...state, filter: action.payload }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state
  }
}

type ActionsTypes = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType |
  SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType | SetFilterActionType

type FollowActionType = {
  type: typeof FOLLOW
  userId: number
}
export const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId })

type UnfollowActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollow = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

type SetFilterActionType = {
  type: typeof SET_FILTER
  payload: FilterType
}
export const setFilter = (filter: FilterType): SetFilterActionType => ({type: SET_FILTER, payload: filter})

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getUsersThunk = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
  dispatch(toggleIsFetching(true))
  dispatch(setCurrentPage(page))
  dispatch(setFilter(filter))
  let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(data.items))
  dispatch(setTotalUsersCount(data.totalCount))
};


const _followUnfollowFlow = async (dispatch: DispatchType,
    userId: number, apiMethod: (userId: number) => Promise<ApiResponseType>,
    actionCreator: (userId: number) => UnfollowActionType | FollowActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))
}

export const followThunk = (userId: number): ThunkType => async (dispatch) => {
  let apiMethod = userAPI.follow.bind(userAPI)
  await _followUnfollowFlow(dispatch, userId, apiMethod, follow)
}

export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
  let apiMethod = userAPI.unfollow.bind(userAPI)
  await _followUnfollowFlow(dispatch, userId, apiMethod, unfollow)
}

export default usersReducer