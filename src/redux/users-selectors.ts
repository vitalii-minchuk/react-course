import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

export const getUsersList = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

// export const getUsersListSelector = (state: AppStateType) => {
//   return getUsersList(state).filter(user => user);
// };

export const getUsersListSuperSelector = createSelector(getUsersList, getIsFetching,
  (users, isFetching) => {
  return users.filter(user => isFetching ? user : user);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};