import React from "react";
import s from "./Dialogues.module.css";
import MessageItem from "./MessageItem/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

const Dialogues = (props) => {
  let messageElements = props.messagesData.map((mes) => {
    return <MessageItem key={mes.id} id={mes.id} message={mes.message} />
  });

  let dialogueElements = props.dialoguesData.map((user) => {
    return <DialogueItem key={user.id} id={user.id} name={user.name} />
  });

  const addNewMessage = (values) => {
    props.SendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Navigate to={"/login"} />

  return (
    <div className={s.dialoguesInner}>
      <h4>My Dialogues</h4>
      <div className={s.dialogues}>
        <ul className={s.list}>
          {dialogueElements}
        </ul>
        <div className={s.messages}>
          {messageElements}
        </div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.box}>
      <Field
        name={"newMessageBody"}
        component={"textarea"}
        className={s.textarea}
        value={props.newMessageBody}
        placeholder="Enter your message"
      />
      <button className={s.addBtn}>Add Message</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogues;