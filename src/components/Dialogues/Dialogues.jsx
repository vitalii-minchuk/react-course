import React from "react";
import { Link } from "react-router-dom";
import s from "./Dialogues.module.css";
import MessageItem from "./MessageItem/Message";
import DialogueItem from "./DialogueItem/DialogueItem";

const Dialogues = (props) => {
  let messageElements = props.state.dialogues.messagesData.map((mes) => {
    return <MessageItem key={mes.id} id={mes.id} message={mes.message}/>
  });

  let dialogueElements = props.state.dialogues.dialoguesData.map((user) => {
    return <DialogueItem key={user.id} id={user.id} name={user.name}/>
  })

  return (
    <div>
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
        <textarea className={s.textarea}></textarea>
        <button className={s.addBtn}>Add Message</button>
      </div>
    </div>
  );
};

export default Dialogues;