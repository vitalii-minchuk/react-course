import React from "react";
import { connect } from "react-redux";
import { follow,
  followThunk,
  unfollowThunk,
  getUsersThunk,
  setCurrentPage,
  unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersListSuperSelector} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  
  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
  };

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsersThunk(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
      <h4>Users</h4>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
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
};

const mapStateToProps = (state) => {
  return {
    users: getUsersListSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, { follow, unfollow, setCurrentPage,
  getUsersThunk, followThunk, unfollowThunk}
)(UsersContainer);
