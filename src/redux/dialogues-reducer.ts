import { InferActionsTypes } from "./redux-store"

type DialogType = { id: number, name: string }
type MessageType = { id: number, message: string }

let initialState = {
  messagesData: [
    {message: "Hi", id: 1},
    {message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nihil, necessitatibus culpa hic rem iusto", id: 2},
    {message: "Lorem ipsum dolor sit amet", id: 3},
    {message: "Lorem ipsum", id: 4},
    {message: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit quas quisquam accusamus natus fuga? Delectus, natus deleniti! Mollitia eaque optio similique tempore itaque ab repudiandae officia, reprehenderit recusandae ipsa. Necessitatibus.", id: 5},
  ] as Array<MessageType>,
  dialoguesData: [
    {name: "Alex", id: 1},
    {name: "Ed", id: 2},
    {name: "John", id: 3},
    {name: "Mary", id: 4},
    {name: "Sophy", id: 5},
  ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


const dialoguesReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type){
    case "SN/DIALOGUES/SEND_MESSAGE":
      let body = action.newMessageBody
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 6, message: body}],
      }
    default:
      return state
  }
}

export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({ type: "SN/DIALOGUES/SEND_MESSAGE", newMessageBody } as const)
}

export default dialoguesReducer