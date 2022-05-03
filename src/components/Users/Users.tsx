import React from "react";
import { Link } from "react-router-dom";
import { FilterType } from "../../redux/users-reducer";
import { UserType } from "../../types/types";
import Pagination from "../common/Pagination/Pagination";
import s from "./Users.module.css";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";

const photo: string = "https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png"

type PropsType = {
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void 
  currentPage: number
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollowThunk: (userId: number) => void
  followThunk: (userId: number) => void
  onFilterChanged: (filter: FilterType) => void
}


const Users: React.FC<PropsType> = ({onPageChanged, followThunk, unfollowThunk, onFilterChanged, 
  followingInProgress, users, totalUsersCount, pageSize, currentPage}) => {
  
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Pagination
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      {
        users.map(user => <div className={s.item} key={user.id}>
          <div className={s.info}>
            <Link to={"/profile/" + user.id}>
              <img className={s.ava} src={user.photos.small != null ? user.photos.small : photo} alt="avatar" />
            </Link>
            {user.followed
              ? <button disabled={followingInProgress.some(id => id === user.id)}
                className={s.followBtn}
                onClick={() => {unfollowThunk(user.id)}}
              >Unfollow</button>

              : <button disabled={followingInProgress.some(id => id === user.id)}
                className={s.followBtn}
                onClick={() => {followThunk(user.id)}}
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