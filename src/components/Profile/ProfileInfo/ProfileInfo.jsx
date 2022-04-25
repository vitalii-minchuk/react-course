import React from "react";
import Preloader from "../../common/preloader/Preloader";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const photo = 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png';

const ProfileInfo = (props) => {
  const [editMode, setEditMod] = React.useState(false);

  if (!props.profile) {
    return <Preloader />
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  };

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      () => {
        setEditMod(false);
      }
    );
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
        {editMode
          ? <ProfileDataFormReduxForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
            />
          : <ProfileData profile={props.profile}
            isOwner={props.isOwner}
            goEditMode={() => setEditMod(true)}
          />
        }
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  )
};

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contacts}><b>{contactTitle}: </b>{contactValue}</div>
};

const ProfileData = ({profile, isOwner, goEditMode}) => {
  return (
    <div>
      {isOwner && <button className={s.editBtn} onClick={goEditMode} >EDIT</button>}
      <div>
        <b>Full name: </b>{profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>About me: </b>{profile.aboutMe}
      </div>
      <div>
        <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
          return <Contact key={key}  contactTitle={key} contactValue={profile.contacts[key]} />
        })}
      </div>
    </div>
  )
};

export default ProfileInfo;