import React from "react";
import s from "./Dialogues.module.css";
import MessageItem from "./MessageItem/Message";
import DialogueItem from "./DialogueItem/DialogueItem";

const Dialogues = (props) => {
  let messageElements = props.messagesData.map((mes) => {
    return <MessageItem key={mes.id} id={mes.id} message={mes.message}/>
  });

  let dialogueElements = props.dialoguesData.map((user) => {
    return <DialogueItem key={user.id} id={user.id} name={user.name}/>
  });
  
  let onSendMessageClick = () => {
    props.SendMessage();
  };
  let onNewMessageChange = (evt) => {
    let body = evt.target.value;
    props.updateNewMessageBody(body);
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
          value={ props.newMessageBody }
          placeholder="Enter your message"
        />
        <button onClick={ onSendMessageClick } className={s.addBtn}>Add Message</button>
      </div>
    </div>
  );
};

export default Dialogues;