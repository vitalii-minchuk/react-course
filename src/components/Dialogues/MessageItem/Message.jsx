import React from "react";

const MessageItem = (props) => {
  return (
    <p id={props.id}>{props.message}</p>
  )
};

export default MessageItem;