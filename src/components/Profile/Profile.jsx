import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css"

const Profile = () => {
  return (
    <div>
      <h4>My Profile</h4>
      <div className={s.contentImg}>
      </div>
      <MyPosts />
    </div>
  );
};

export default Profile;