import React from "react";
import { connect } from "react-redux";
import { getAuthUserDataThunk, logout } from "../../redux/auth-reducer";
import Header from "./Header";

const url = "https://social-network.samuraijs.com/api/1.0/";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserDataThunk();
  }

  render() {
    return <Header {...this.props} />
  }
};

const mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {getAuthUserDataThunk, logout})(HeaderContainer);
