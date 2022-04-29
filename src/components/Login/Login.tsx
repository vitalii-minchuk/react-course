import React from "react"
import s from "./Login.module.css"
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from "../common/FormsControls/FormsControls"
import { maxLength, required } from "../../utils/validators/validators"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) return <Navigate to={"/profile"} />

  return (
    <div>
      <h2 className={s.title}>login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

const maxLength40 = maxLength(40)

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormOwnType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnType> & LoginFormOwnType> = ({handleSubmit, error, captchaUrl}) => {

  return (
    <form className={s.form} onSubmit={handleSubmit} >
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
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        <Field
          className={s.captcha}
          placeholder={"Symbols from image"}
          name={"captcha"}
          component={Input}
          validate={[required]}
        />
      }
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button className={s.loginBtn}>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnType>({ form: "login" })(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)
