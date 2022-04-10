import React from "react";
import s from "./Post.module.css"

const Post = (props) => {
  return (
    <div className={s.item}>
      <img className={s.img} src={props.src} alt="ava" />
        <p className={s.post}>{props.message}</p>
        <div className={s.likes}>
          <span className={s.likeIcon}>like</span>
          <span className={s.num}>{props.likesCount}</span>
        </div>
    </div>
  );
};

export default Post;