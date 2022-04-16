import React from "react";
import { Link } from "react-router-dom";
import s from './Users.module.css';

const photo = 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.pagination}>
        {
          pages.map(page => {
            return (
              <span
                key={page}
                className={props.currentPage === page ? s.selectedPage : undefined}
                onClick={() => { props.onPageChanged(page) }}
              >
                {page}
              </span>
            )
          })
        }
      </div>
      {
        props.users.map(user => <div className={s.item} key={user.id}>
          <div className={s.info}>
            <Link to={"/profile/" + user.id}>
              <img className={s.ava} src={user.photos.small != null ? user.photos.small : photo} alt="avatar" />
              {user.followed
                ? <button className={s.followBtn} onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
                : <button className={s.followBtn} onClick={() => { props.follow(user.id) }}>Follow</button>
              }
            </Link>
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