import React from "react";
import s from "./Login.module.css";
import { Field, reduxForm } from 'redux-form';
import { Input } from "../common/FormsControls/FormsControls";
import { maxLength, required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) return <Navigate to={"/profile"} />

  return (
    <div>
      <h2 className={s.title}>login</h2>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const maxLength40 = maxLength(40)

const LoginForm = (props) => {

  return (
    <form className={s.form} onSubmit={props.handleSubmit} >
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required, maxLength40]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[required, maxLength40]}
        />
      </div>
      <div>
        <label className={s.checkLabel}>
          <Field
            name={"rememberMe"}
            component={"input"}
            className={s.check}
            type={"checkbox"}
          /> 
          remember me
        </label>
      </div>
      <div>
        <button className={s.loginBtn}>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm)

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);
