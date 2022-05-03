import { GetItemsType, ApiResponseType, instance } from "./api"

export const userAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 20, term: string = '', friend: null | boolean = null) {
    return instance.get<GetItemsType>("users?page=" + currentPage + "&count=" + pageSize + "&term=" + term + (friend === null ? "" : "&friend=" + friend)).then(res => res.data)
  },
  unfollow(userId: number) {
    return instance.delete("follow/" + userId).then(res => res.data) as Promise<ApiResponseType>
  },
  follow(userId: number) {
    return instance.post<ApiResponseType>("follow/" + userId).then(res => res.data)
  }
}
