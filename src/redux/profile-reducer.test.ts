import profileReducer, { actions } from "./profile-reducer"

let state = {
  postData: [
    {id: 1, message: "its my first post", likesCount: 124, src: "https://images.pexels.com/photos/990349/pexels-photo-990349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 2, message: "yo yo yo", likesCount: 15, src: "https://images.pexels.com/photos/312839/pexels-photo-312839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 3, message: "hey", likesCount: 1, src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {id: 4, message: "gasdfgadfg fdgafgasg", likesCount: 5, src: "https://www.stockvault.net/data/2019/03/11/261989/thumb16.jpg"},
    {id: 5, message: "hey", likesCount: 33, src: "https://www.inpixio.com/remove-background/images/main-after.jpg"},
  ],
  profile: null,
  status: ""
};

it("new post should be added", () => {
  let action = actions.addPostActionCreator("it-kamasutra");

  let newState = profileReducer(state, action);

  expect(newState.postData.length).toBe(6);
});

it("message of new post should be correct", () => {
  let action = actions.addPostActionCreator("it-kamasutra");
  
  let newState = profileReducer(state, action);

  expect(newState.postData[5].message).toBe("it-kamasutra");
});

it("after deleting length of messages should be decrement", () => {
  let action = actions.deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.postData.length).toBe(4);
});

it("after deleting length should't be decrement if id is incorrect", () => {
  let action = actions.deletePost(100);

  let newState = profileReducer(state, action);

  expect(newState.postData.length).toBe(5);
});
