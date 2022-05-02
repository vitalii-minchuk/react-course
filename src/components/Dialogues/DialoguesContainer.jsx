import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/AuthRedirect";
import { actions } from "../../redux/dialogues-reducer";
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
    SendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageCreator(newMessageBody));
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogues);
