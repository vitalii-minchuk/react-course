import usersReducer, { follow, InitialStateType, unfollow } from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {id: 0, name: "McMin4-1", followed: false, photos: {small: null, large: null}, status: 'ggg'},
      {id: 1, name: "McMin4-2", followed: false, photos: {small: null, large: null}, status: 'ggg1'},
      {id: 2, name: "McMin4-3", followed: true, photos: {small: null, large: null}, status: 'ggg2'},
      {id: 3, name: "McMin4-4", followed: true, photos: {small: null, large: null}, status: 'ggg3'},
    ],
    pageSize: 20 ,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
      term: '',
      friend: null as null | boolean
    }
  }
})

test("follow success", () => {
  
  const newState = usersReducer(state, follow(1))
  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
  
  const newState = usersReducer(state, unfollow(3))
  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})