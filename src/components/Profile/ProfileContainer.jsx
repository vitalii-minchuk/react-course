import React from "react";
import { connect } from "react-redux";
import { getUserProfileThunk } from "../../redux/profile-reducer";
import Profile from "./Profile";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";

const url = "https://social-network.samuraijs.com/api/1.0/";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId ?? 2;
    this.props.getUserProfileThunk(userId)
  };

  render() {
    if (!this.props.isAuth) return <Navigate to={"/login"} />

    return (
      <Profile {...this.props} profile={this.props.profile} />
    )
  }
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfileThunk })(withUrlDataContainerComponent);