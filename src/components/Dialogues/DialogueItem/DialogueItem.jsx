import React from "react";
import { Link } from "react-router-dom";

const DialogueItem = (props) => {
  let path = "/dialogues/" + props.id;

  return (
    <li>
      <Link to={path}>{props.name}</Link>
    </li>
  )
};

export default DialogueItem;