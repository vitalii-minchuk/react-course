const SEND_MESSAGE = "SEND_MESSAGE";

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

let initialState = {
  messagesData: [
    {message: "Hi", id: 1},
    {message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nihil, necessitatibus culpa hic rem iusto", id: 2},
    {message: "Lorem ipsum dolor sit amet", id: 3},
    {message: "Lorem ipsum", id: 4},
    {message: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit quas quisquam accusamus natus fuga? Delectus, natus deleniti! Mollitia eaque optio similique tempore itaque ab repudiandae officia, reprehenderit recusandae ipsa. Necessitatibus.", id: 5},
  ],
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
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 6, message: body}],
      };
    default:
      return state;
  };
};

export default dialoguesReducer;