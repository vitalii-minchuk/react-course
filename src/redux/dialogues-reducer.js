const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
  }
};

let initialState = {
  messagesData: [
    {message: "Hi", id: 1},
    {message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nihil, necessitatibus culpa hic rem iusto", id: 2},
    {message: "Lorem ipsum dolor sit amet", id: 3},
    {message: "Lorem ipsum", id: 4},
    {message: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit quas quisquam accusamus natus fuga? Delectus, natus deleniti! Mollitia eaque optio similique tempore itaque ab repudiandae officia, reprehenderit recusandae ipsa. Necessitatibus.", id: 5},
  ],
  newMessageBody: '',
  dialoguesData: [
    {name: "Alex", id: 1},
    {name: "Ed", id: 2},
    {name: "John", id: 3},
    {name: "Mary", id: 4},
    {name: "Sophy", id: 5},
  ],
}

const dialoguesReducer = (state = initialState, action) => {
  switch(action.type){
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body,
      };
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: "",
        messagesData: [...state.messagesData, {id: 6, message: body}],
      };
    default:
      return state;
  };
};

export default dialoguesReducer;