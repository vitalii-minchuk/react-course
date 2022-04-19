import React from "react";
import s from "./Login.module.css";
import { Field, reduxForm } from 'redux-form';

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  }

  return (
    <div>
      <h2 className={s.title}>login</h2>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const LoginForm = (props) => {

  return (
    <form className={s.form} onSubmit={props.handleSubmit} >
      <div>
        <Field placeholder={"Login"} name={"login"} component={"input"} />
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} component={"input"} />
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
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm)

export default Login;
