import React from "react";
import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const photo = 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div className={s.item}>
      <div className={s.picture}>
        <img
          className={s.userImg}
          src={props.profile.photos.large || photo}
          alt="user photo"
        />
        {props.isOwner &&
          <input className={s.addPhoto} onChange={onMainPhotoSelected} type={"file"} />
        }
      </div>
      <div className={s.info}>
        <div className={s.userDesc}>
          <h5>{props.profile.fullName}</h5>
          <div className={s.contacts}>
            <p className={s.textName}>contacts:</p>
            <p>{props.profile.contacts.facebook}</p>
            <p>{props.profile.contacts.twitter}</p>
            <p>{props.profile.contacts.github}</p>
          </div>
        </div>
        <div className={s.job}>
          <p className={s.textName}>looking for  a job:</p>
          <p>{props.profile.lookingForAJobDescription}</p>
        </div>
        <div className={s.about}>
          <p className={s.textName}>about me:</p>
          <p>{props.profile.aboutMe}</p>
        </div>
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo;