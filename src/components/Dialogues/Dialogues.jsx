import React from "react";
import s from "./Dialogues.module.css"

const Dialogues = () => {
  return (
    <div>
      <h4>My Dialogues</h4>
      <div>
        <ul>
          <li>Alex</li>
          <li>Alex</li>
          <li>Alex</li>
          <li>Alex</li>
        </ul>
        <div>
          
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
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