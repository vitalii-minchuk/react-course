import React from "react";
import { connect } from "react-redux";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogues-reducer";
import Dialogues from "./Dialogues";

const mapStateToProps = (state) => {
  return {
    dialoguesData: state.dialogues.dialoguesData,
    newMessageBody: state.dialogues.newMessageBody,
    messagesData: state.dialogues.messagesData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    SendMessage: () => {
      dispatch(sendMessageCreator());
    },
  }
}


const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogues);

export default DialoguesContainer;