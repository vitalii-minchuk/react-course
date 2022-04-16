import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "223a8e86-48fc-45d4-b272-adf11214075e"
  },
});

export const userAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get("users?page=" + currentPage + "&count=" + pageSize)
      .then(response => response.data);
  },
}

export const authAPI = {
  authMe() {
    return instance.get("auth/me")
  },
}

