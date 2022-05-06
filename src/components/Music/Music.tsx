import axios from "axios"
import React, { useEffect, useState } from "react"
// @ts-ignore
import s from "./Music.module.css"

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


const MusicPage = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
  const [userDetails, setUserDetails] = useState<UserType | null>(null)
  const [users, setUsers] = useState<SearchUserType[]>([])
  const [tempSearch, setTempSearch] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login
    }
  }, [selectedUser])

  useEffect(() => {
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(res => {
      setUsers(res.data.items.filter((m, index, arr) => index >= arr.length - 12))
    })
  }, [searchTerm])

  useEffect(() => {
    if (!!selectedUser) {
      axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then(res => {
          setUserDetails(res.data)
        }
      )
    }
  }, [selectedUser])

  return (
    <>
      <h2 className={s.title}>Music</h2>
      <div>
        <input
          placeholder="search"
          value={tempSearch}
          onChange={(e) => {setTempSearch(e.currentTarget.value)}}
        />
        <button onClick={() => {
          setSearchTerm(tempSearch)
        }} >find</button>
      </div>
      <div className={s.box}>
        <ul className={s.list}>
          {users.map(el => <li key={el.id} onClick={() => {
            setSelectedUser(el)
          }} className={selectedUser === el ? s.selected : ""}>{el.login}</li>)}
        </ul>
        <div>
          <h3>{selectedUser?.login}</h3>
          {selectedUser && <div>
            <img src={userDetails?.avatar_url} alt="avatar" />
            <p>followers:{userDetails?.followers}</p>
          </div>}
        </div>
      </div>
    </>
  )
}

export default MusicPage