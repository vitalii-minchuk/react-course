import { GetItemsType, ApiResponseType, instance } from "./api"

export const userAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get<GetItemsType>("users?page=" + currentPage + "&count=" + pageSize).then(res => res.data)
  },
  unfollow(userId: number) {
    return instance.delete("follow/" + userId).then(res => res.data) as Promise<ApiResponseType>
  },
  follow(userId: number) {
    return instance.post<ApiResponseType>("follow/" + userId).then(res => res.data)
  }
}
