import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css"

const Profile = (props) => {
  return (
    <div>
      <h4>My Profile</h4>
      <div className={s.contentImg}>
      </div>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;