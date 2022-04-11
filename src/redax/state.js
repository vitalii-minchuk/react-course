let store = {
  _state: {
    profilePage: {
      postData: [
        {id: 1, message: "its my first post", likesCount: 124, src: "https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {id: 2, message: "yo yo yo", likesCount: 15, src: "https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {id: 3, message: "hey", likesCount: 1, src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {id: 4, message: "gasdfgadfg fdgafgasg", likesCount: 5, src: "https://www.stockvault.net/data/2019/03/11/261989/thumb16.jpg"},
        {id: 5, message: "hey", likesCount: 33, src: "https://www.inpixio.com/remove-background/images/main-after.jpg"},
      ],
      newPostText: "",
    },
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
  },
  _callSubscriber () {
    console.log("state has been changed")
  },
  getState () {
    return this._state;
  },
  subscribe (observer) {
    this._callSubscriber = observer;
  },
  dispatch (action) {
    if (action.type === 'ADD-POST') {
      let newPost = {
        id: 6,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
        src: 'https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png',
      }
      this._state.profilePage.postData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    }
  },
};

window.store = store;

export default store;
