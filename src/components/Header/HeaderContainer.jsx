import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { authAPI } from "../../api/api";
import { setAuthUserData } from "../../redux/auth-reducer";
import Header from "./Header";

const url = "https://social-network.samuraijs.com/api/1.0/";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios.get(url + "auth/me", {
      withCredentials: true,
    })
    authAPI.authMe().then(response => {
        if (response.data.resultCode === 0) {
          let  { id, email, login } = response.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      });
  }

  render() {
    return <Header {...this.props} />
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
