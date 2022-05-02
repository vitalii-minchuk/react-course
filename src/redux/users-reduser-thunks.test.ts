import { ApiResponseType, ResultCodeEnum } from "../api/api"
import { userAPI } from "../api/users-api"
import { followThunk } from "./users-reducer"

jest.mock("../api/users-api")
const userAPIMock = userAPI

const result: ApiResponseType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {}
}
// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test("", async () => {
  const thunk = followThunk(1)
  const dispatchMock = jest.fn()

  // @ts-ignore
  await thunk(dispatchMock)

  expect(dispatchMock).toBeCalledTimes(3)
})