import { Dispatch } from "redux"
import { chatApi, ChatMessageType, StatusType } from "../api/chat-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { v4 } from "uuid"

type ChatMessageWithIdType = ChatMessageType & {id: string}

let initialState = {
  messages: [] as ChatMessageWithIdType[],
  status: "pending" as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case "SN/CHAT/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages,
        ...action.payload.messages.map(el => ({...el, id: v4()}))].filter((m, index, arr) => index >= arr.length - 30)
      }
    case "SN/CHAT/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({ type: "SN/CHAT/MESSAGES_RECEIVED", payload: { messages } } as const),
  statusChanged: (status: StatusType) => ({type: "SN/CHAT/STATUS_CHANGED", payload: { status } } as const)
}

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessagesHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start()
  chatApi.subscribe("message-received", newMessagesHandlerCreator(dispatch))
  chatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe("message-received", newMessagesHandlerCreator(dispatch))
  chatApi.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
  chatApi.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message)
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default chatReducer

