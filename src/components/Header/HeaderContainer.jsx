import React from "react";
import { connect } from "react-redux";
import { getAuthUserDataThunk } from "../../redux/auth-reducer";
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
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, {getAuthUserDataThunk})(HeaderContainer);
