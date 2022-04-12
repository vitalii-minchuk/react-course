import React from "react";
import s from "./Dialogues.module.css";
import MessageItem from "./MessageItem/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogues-reducer";

const Dialogues = (props) => {
  let state = props.store.getState();
  let messageElements = state.dialogues.messagesData.map((mes) => {
    return <MessageItem key={mes.id} id={mes.id} message={mes.message}/>
  });

  let dialogueElements = state.dialogues.dialoguesData.map((user) => {
    return <DialogueItem key={user.id} id={user.id} name={user.name}/>
  });

  let newMessageBody = state.dialogues.newMessageBody;
  
  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (evt) => {
    let body = evt.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <div className={s.dialoguesInner}>
      <h4>My Dialogues</h4>
      <div className={s.dialogues}>
        <ul className={s.list}>
          { dialogueElements }
        </ul>
        <div className={s.messages}>
          { messageElements }
        </div>
      </div>
      <div className={s.box}>
        <textarea
          onChange={ onNewMessageChange }
          className={s.textarea}
          value={ newMessageBody }
          placeholder="Enter your message"
        />
        <button onClick={ onSendMessageClick } className={s.addBtn}>Add Message</button>
      </div>
    </div>
  );
};

export default Dialogues;