import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";

const MyPosts = (props) => {
  let postItems = props.posts.map(el => {
    return <Post
      key={el.id}
      id={el.id}
      message={el.message}
      likesCount={el.likesCount}
      src={el.src}
    />
  });
  
  const textareaValue = React.createRef();
  
  const addPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = textareaValue.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div>
      <h5>My Posts</h5>
      <div className={s.box}>
        <textarea
          onChange={onPostChange}
          ref={textareaValue}
          className={s.textarea}
          value={props.newPostText}
        />
        <button onClick={addPost} className={s.addBtn}>Add Post</button>
      </div>
      <div>
        { postItems }
      </div>
    </div>
  );
};

export default MyPosts;