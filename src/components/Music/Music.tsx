import axios from "axios"
import React, { useEffect, useState } from "react"
// @ts-ignore
import s from "./Music.module.css"

export const Search = (props: SearchPropsType) => {
  const [tempSearch, setTempSearch] = useState("")

  useEffect(() => {
    setTempSearch(props.value)
  }, [props.value])

  return (
    <div>
      <input
        placeholder="search"
        value={tempSearch}
        onChange={(e) => { setTempSearch(e.currentTarget.value) }}
      />
      <button onClick={() => { props.onSubmit(tempSearch) }} >find</button>
    </div>
  )
}

export const UsersList = (props: UsersListPropsType) => {
  const [users, setUsers] = useState<SearchUserType[]>([])

  useEffect(() => {
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
      .then(res => {
        setUsers(res.data.items.filter((m, index, arr) => index >= arr.length - 11))
      })
  }, [props.term])

  useEffect(() => {
    if (props.selectedUser === null) {
      setUsers([])
    }
  }, [props.selectedUser])

  return (
    <ul className={s.list}>
      {users.map(el => <li key={el.id} onClick={() => {
        props.onUserSelect(el)
      }} className={props.selectedUser === el ? s.selected : ""}>{el.login}</li>)}
    </ul>
  )
}

const startTimerValue = 20

export const UsersDetails = (props: UsersDetailsPropsType) => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null)
  const [seconds, setSeconds] = useState(startTimerValue)

  useEffect(() => {
    if (!!props.user) {
      axios.get<UserType>(`https://api.github.com/users/${props.user.login}`)
        .then(res => {
          setSeconds(startTimerValue)
          setUserDetails(res.data)
        }
      )
    }
  }, [props.user])

  useEffect(() => {
    if(seconds < 1) {
      setUserDetails(null)
    }
  }, [seconds])

  useEffect(() => {
    if (props.selectedUser === null) {
      setUserDetails(null)
    }
  }, [props.selectedUser])

  return (
    <div>
      <div className={s.topBox}>
        <h3>{userDetails?.login}</h3>
        {userDetails &&
          <Timer
            timerKey={userDetails.id.toString()}
            seconds={seconds}
            onChange={setSeconds}
          />
        }
      </div>
      {userDetails && <div>
        <img className={s.img} src={userDetails?.avatar_url} alt="avatar" />
        <p>followers:{userDetails?.followers}</p>
      </div>}
    </div>
  )
}

export const Timer = (props: TimerPropsType) => {
  const [seconds, setSeconds] = useState(props.seconds)

  useEffect(() => {
    setSeconds(props.seconds)
  }, [props.seconds])

  useEffect(() => {
    props.onChange(seconds)
  }, [seconds])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((actualSec) => actualSec - 1)
    }, 1000)

    return () => { clearInterval(intervalId) }
    
  }, [props.timerKey])

  return (
    <div>
      <h5>{seconds}</h5>
    </div>
  )
}

const MusicPage = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)

  const [searchTerm, setSearchTerm] = useState("")

  const resetHandel = () => {
    setSelectedUser(null)
    setSearchTerm("")
  }

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login
    }
  }, [selectedUser])

  return (
    <>
      <h2 className={s.title}>Music</h2>
      <Search value={searchTerm} onSubmit={(value) => { setSearchTerm(value) }} />
      <button onClick={resetHandel}
      >reset</button>
      <div className={s.box}>
        <UsersList
          term={searchTerm}
          selectedUser={selectedUser}
          onUserSelect={(user) => { setSelectedUser(user) }}
        />
        <UsersDetails user={selectedUser} selectedUser={selectedUser} />
      </div>
    </>
  )
}

type UserType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}
type SearchUserType = {
  login: string
  id: number
}
type SearchResult = {
  items: Array<SearchUserType>
}
type SearchPropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
}
type UsersListPropsType = {
  term: string
  selectedUser: SearchUserType | null
  onUserSelect: (user: SearchUserType) => void
}
type UsersDetailsPropsType = {
  user: SearchUserType | null
  selectedUser: SearchUserType | null
}
type TimerPropsType = {
  seconds: number
  onChange: (actualSec: number) => void
  timerKey: string
}

export default MusicPage