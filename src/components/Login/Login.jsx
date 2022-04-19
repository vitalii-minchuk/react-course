import React from "react";
import s from "./Login.module.css";
import { Field, reduxForm } from 'redux-form';
import { Input } from "../common/FormsControls/FormsControls";
import { maxLength, required } from "../../utils/validators/validators";

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

const maxLength20 = maxLength(20)

const LoginForm = (props) => {

  return (
    <form className={s.form} onSubmit={props.handleSubmit} >
      <div>
        <Field
          placeholder={"Login"}
          name={"login"}
          component={Input}
          validate={[required, maxLength20]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[required, maxLength20]}
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

export default Login;
