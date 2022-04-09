import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css"

const MyPosts = () => {
  return (
    <div>
      <h5>My Posts</h5>
      <div className={s.box}>
        <textarea className={s.textarea}></textarea>
        <button className={s.addBtn}>Add Post</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default MyPosts;