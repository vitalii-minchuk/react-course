import React from "react";
import s from "./Post.module.css"

const Post = () => {
  return (
    <div className={s.item}>
      <img className={s.img} src="https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="ava" />
        <p className={s.post}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sed natus harum voluptates rerum ab libero. Modi in voluptatibus iure eos autem nisi fugiat illo assumenda. Sint laboriosam assumenda autem.</p>
        <div className={s.likes}>
          <span className={s.likeIcon}>like</span>
          <span className={s.num}>3</span>
        </div>
    </div>
  );
};

export default Post;