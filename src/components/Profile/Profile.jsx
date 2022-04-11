import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css"

const Profile = (props) => {
  return (
    <div>
      <h4>My Profile</h4>
      <div className={s.contentImg}>
      </div>
      <MyPosts
        dispatch={props.dispatch}
        profilePage={props.profilePage}
      />
    </div>
  );
};

export default Profile;