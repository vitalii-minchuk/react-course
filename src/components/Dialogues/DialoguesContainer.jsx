import React from "react";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogues-reducer";
import Dialogues from "./Dialogues";

const DialoguesContainer = (props) => {
  let state = props.store.getState();
  
  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Dialogues messagesData={state.dialogues.messagesData}
      dialoguesData={state.dialogues.dialoguesData}
      newMessageBody={state.dialogues.newMessageBody}
      onSendMessage={onSendMessageClick}
      updateNewMessageBody={onNewMessageChange}
      />
  );
};

export default DialoguesContainer;