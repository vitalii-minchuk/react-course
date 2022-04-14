import * as axios from "axios";
import React from "react";
import s from './Users.module.css';

const photo = 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png';
const url = "https://social-network.samuraijs.com/api/1.0/users";

class Users extends React.Component {

  componentDidMount() {
    axios.get(url + '?page=' + this.props.currentPage + '&count=' + this.props.pageSize)
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount)
      });
  };

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios.get(url + '?page=' + pageNumber + '&count=' + this.props.pageSize)
      .then(response => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
      pages.push(i);
    }

    return <div>
      <h4>Users</h4>
      
      <div className={s.pagination}>
        {
          pages.map(page => {
            return (
              <span
                key={page}
                className={this.props.currentPage === page ? s.selectedPage : undefined}
                onClick={() => { this.onPageChanged(page) }}
              >{page}</span>
            )
          })
        }
      </div>
      {
        this.props.users.map(user => <div className={s.item} key={user.id}>
          <div className={s.info}>
            <img className={s.ava} src={user.photos.small != null ? user.photos.small : photo} alt="avatar" />
            {user.followed
              ? <button className={s.followBtn} onClick={() => { this.props.unfollow(user.id) }}>Unfollow</button>
              : <button className={s.followBtn} onClick={() => { this.props.follow(user.id) }}>Follow</button>
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
  }
};

export default Users;