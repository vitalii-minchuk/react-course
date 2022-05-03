import React from "react"
import s from "./Login.module.css"
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from "../common/FormsControls/FormsControls"
import { maxLength, required } from "../../utils/validators/validators"
import { connect, useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"

export const LoginPage: React.FC = (props) => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData: any) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) return <Navigate to={"/profile"} />

  return (
    <div>
      <h2 className={s.title}>login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
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

