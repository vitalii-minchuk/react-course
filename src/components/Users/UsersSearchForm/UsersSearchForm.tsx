import { Field, Form, Formik } from "formik"
import React from "react"
import { FilterType } from "../../../redux/users-reducer"
import s from "./UsersSearchForm.module.css"

type FormType = {
  term: string
  friend: "true" | "false" | "null"
}

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: FormType) => {
  const errors = {}
  return errors
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {

  const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    
    props.onFilterChanged(filter)
    setSubmitting(false)
  }
  return (
    <Formik
       initialValues={{ term: '', friend: "null"}}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form className={s.form}>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
           </Field>
           <button className={s.btn} type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
  )
})

export default UsersSearchForm