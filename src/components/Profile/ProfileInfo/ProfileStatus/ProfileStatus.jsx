import React from "react";
import s from "./ProfileStatus.module.css";

const ProfileStatus = (props) => {
  const [editMod, setEditMod] = React.useState(false);
  const [status, setStatus] = React.useState(props.status);

  const activateEditMode = () => {
    setEditMod(true);
  };

  const deactivateEditMode = () => {
    setEditMod(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  React.useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={s.status}>
      {!editMod &&
        <div>
          <span
            className={s.text}
            onDoubleClick={activateEditMode}
          >
            {props.status || "STATUS"}
          </span>
        </div>
      }
      {editMod &&
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      }
    </div>
  );
};

export default ProfileStatus;