import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { Field, reduxForm } from 'redux-form';
import { maxLength, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

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

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div>
      <h5>My Posts</h5>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div>
        {postItems}
      </div>
    </div>
  );
};

const maxLength30 = maxLength(30)
const AddNewPostForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={"newPostText"}
        component={Textarea}
        validate={[ required, maxLength30 ]}
      />
      <button className={s.addBtn}>Add Post</button>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm"
})(AddNewPostForm)

export default MyPosts;