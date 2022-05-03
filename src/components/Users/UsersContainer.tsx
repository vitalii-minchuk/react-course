import React from "react"
import { connect } from "react-redux"
import { followThunk,
  unfollowThunk,
  getUsersThunk, 
  FilterType} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../common/preloader/Preloader"
import { getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersListSuperSelector} from "../../redux/users-selectors"
import { UserType } from "../../types/types"
import { AppStateType } from "../../redux/redux-store"

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
  filter: FilterType
}

type MapDispatchPropsType = {
  unfollowThunk: (userId: number) => void
  followThunk: (userId: number) => void
  getUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
  
  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, this.props.filter)
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props
    this.props.getUsersThunk(pageNumber, pageSize, filter)
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.getUsersThunk(1, pageSize, filter)
  }

  render() {
    return <>
      <h4>{this.props.pageTitle}</h4>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        onFilterChanged={this.onFilterChanged}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        followingInProgress={this.props.followingInProgress}
        followThunk={this.props.followThunk}
        unfollowThunk={this.props.unfollowThunk}
      />
    </>
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersListSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType,
  OwnPropsType, AppStateType>(mapStateToProps, { followThunk,
    unfollowThunk, getUsersThunk }
)(UsersContainer)
