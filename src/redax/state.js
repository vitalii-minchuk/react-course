let state = {
  postData: [
    {id: 1, message: "its my first post", likesCount: 124},
    {id: 2, message: "yo yo yo", likesCount: 15},
    {id: 3, message: "hey", likesCount: 1},
    {id: 4, message: "gasdfgadfg fdgafgasg", likesCount: 5},
    {id: 5, message: "hey", likesCount: 33},
  ],
  dialogues: {
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
    ]
  }
};

export const addPost = (text, i = 6) =>{
  let newPost = {
    id: i,
    message: text,
    likesCount: 44
  }
  state.postData.push(newPost);
}

export default state;
