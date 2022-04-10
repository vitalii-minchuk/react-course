import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css"


const MyPosts = (props) => {
  let postItems = props.state.postData.map(el => {
    return <Post
      key={el.id}
      id={el.id}
      message={el.message}
      likesCount={el.likesCount}
      src={el.src}
    />
  })

  	
  const textareaValue = React.createRef();
  let id = 6;
  const addText = () => {
    let text = textareaValue.current.value;
    let num = Math.floor(Math.random()*1000)
    id++
    console.log(num);
    props.addPost(text,id, num)
  };

  return (
    <div>
      <h5>My Posts</h5>
      <div className={s.box}>
        <textarea ref={textareaValue} className={s.textarea}></textarea>
        <button onClick={addText} className={s.addBtn}>Add Post</button>
      </div>
      <div>
        { postItems }
      </div>
    </div>
  );
};

export default MyPosts;