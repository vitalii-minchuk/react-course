import React from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { Input, Textarea } from "../../../common/FormsControls/FormsControls";
import s from "./ProfileDataForm.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button className={s.saveBtn}>SAVE</button>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>Full name: </b>
        <Field
          className={s.input}
          placeholder={"Full name"}
          name={"fullName"}
          component={Input}
        />
      </div>
      <div>
        <b>Looking for a job: </b>
        <Field
          name={"lookingForAJob"}
          component={"input"}
          className={s.check}
          type={"checkbox"}
        />
      </div>
      <div>
        <b>My professional skills:</b>
        <Field
          name={"lookingForAJobDescription"}
          component={Textarea}
          className={s.textarea}
          placeholder="Your skills"
        />
      </div>
      <div>
        <b>About me: </b>
        <Field
          name={"aboutMe"}
          component={Textarea}
          className={s.textarea}
        />
      </div>
      <div>
        <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
          return <div key={key} className={s.contacts}>
            <Field
              className={s.input}
              placeholder={key}
              name={"contacts." + key}
              component={Input}
            />
          </div>
        })}
      </div>
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm({
  form: "edit-profile"
})(ProfileDataForm)

export default ProfileDataFormReduxForm;