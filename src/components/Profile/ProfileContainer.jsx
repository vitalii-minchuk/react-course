import React from "react";
import { connect } from "react-redux";
import { getStatus, getUserProfileThunk, savePhoto, updateStatus } from "../../redux/profile-reducer";
import Profile from "./Profile";
import { withAuthRedirect } from "../../HOC/AuthRedirect";
import { compose } from "redux";
import { withRouter } from "../../HOC/withRouter";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    };
    this.props.getUserProfileThunk(userId);
    this.props.getStatus(userId)
  }
  
  componentDidMount() {
    this.refreshProfile();
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.router.params.userId != this.props.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile 
        {...this.props}
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    )
  }
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, { getUserProfileThunk, getStatus, updateStatus, savePhoto }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);