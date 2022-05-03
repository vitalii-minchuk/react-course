import React from "react"
import { useSelector } from "react-redux"
import Preloader from "../common/preloader/Preloader"
import { getIsFetching } from "../../redux/users-selectors"
import { Users } from "./Users"

type UsersPagePropsType = {
  pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)
  
  return <>
    <h4>{props.pageTitle}</h4>
    {isFetching ? <Preloader /> : null}
    <Users />
  </>
}

export default UsersPage