import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination/Pagination";
import s from './Users.module.css';

const photo = 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png';

const Users = (props) => {
  
  return (
    <div>
      <Pagination
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
      />
      {
        props.users.map(user => <div className={s.item} key={user.id}>
          <div className={s.info}>
            <Link to={"/profile/" + user.id}>
              <img className={s.ava} src={user.photos.small != null ? user.photos.small : photo} alt="avatar" />
            </Link>
            {user.followed
              ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                className={s.followBtn}
                onClick={() => {props.unfollowThunk(user.id)}}
              >Unfollow</button>

              : <button disabled={props.followingInProgress.some(id => id === user.id)}
                className={s.followBtn}
                onClick={() => {props.followThunk(user.id)}}
              >Follow</button>
            }
          </div>
          <div className={s.desc}>
            <div className={s.userData}>
              <h5>{user.name}</h5>
              <p className={s.status}>{user.status}</p>
            </div>
            <div>
              <p>{'user.location.city'}</p>
              <p>{'user.location.country'}</p>
            </div>
          </div>
        </div>)
      }
    </div>
  );
};

export default Users;