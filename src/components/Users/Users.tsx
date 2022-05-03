import { createBrowserHistory } from "history"
import QueryString from "qs"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FilterType,
  followThunk,
  getUsersThunk,
  unfollowThunk } from "../../redux/users-reducer"
import { getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersListSuperSelector } from "../../redux/users-selectors"
import Pagination from "../common/Pagination/Pagination"
import s from "./Users.module.css"
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm"

const photo: string = "https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png"

type PropsType = {
}

export const Users: React.FC<PropsType> = (props) => {
  
  const followingInProgress = useSelector(getFollowingInProgress)
  const users = useSelector(getUsersListSuperSelector)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)

  const dispatch = useDispatch()
  const history = createBrowserHistory()
 
  useEffect(() => {
    const  search  = history.location.search
    const parsed = QueryString.parse(search.substring(1)) as {term: string , friend: string , page: string}

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
    switch(parsed.friend) {
      case "null": 
        actualFilter = {...actualFilter, friend: null}
        break
      case "true": 
        actualFilter = {...actualFilter, friend: true}
        break
      case "false": 
        actualFilter = {...actualFilter, friend: false}
        break
    }
    dispatch(getUsersThunk(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunk(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunk(1, pageSize, filter))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowThunk(userId))
  }

  const follow = (userId: number) => {
    dispatch(followThunk(userId)) 
  }

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
                onClick={() => {unfollow(user.id)}}
              >Unfollow</button>

              : <button disabled={followingInProgress.some(id => id === user.id)}
                className={s.followBtn}
                onClick={() => {follow(user.id)}}
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
  )
}