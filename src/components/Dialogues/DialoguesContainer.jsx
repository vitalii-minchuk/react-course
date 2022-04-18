import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/AuthRedirect";
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogues);
