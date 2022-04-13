import React from "react";
import s from './Users.module.css';

const Users = (props) => {

  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1, photoUrl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        followed: false, fullName: 'Anna', status: 'Im ok', location: { city: 'Kharkiv', country: 'Ukraine' }
      },
      {
        id: 2, photoUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        followed: false, fullName: 'Elena', status: 'Im ok', location: { city: 'Kharkiv', country: 'Ukraine' }
      },
      {
        id: 3, photoUrl: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        followed: false, fullName: 'Mary', status: 'Im not ok', location: { city: 'Kharkiv', country: 'Ukraine' }
      },
    ]);
  }
  return (
    <div>
      <h4>Users</h4>
      {
        props.users.map(user => <div className={s.item} key={user.id}>
          <div className={s.info}>
            <img className={s.ava} src={user.photoUrl} alt="avatar" />
            {user.followed
              ? <button className={s.followBtn} onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
              : <button className={s.followBtn} onClick={() => { props.follow(user.id) }}>Follow</button>
            }
          </div>
          <div className={s.desc}>
            <div className={s.userData}>
              <h5>{user.fullName}</h5>
              <p className={s.status}>{user.status}</p>
            </div>
            <div>
              <p>{user.location.city}</p>
              <p>{user.location.country}</p>
            </div>
          </div>
        </div>)
      }
    </div>
  );
};

export default Users;