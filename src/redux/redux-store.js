import { combineReducers, createStore } from "redux";
import dialoguesReducer from "./dialogues-reducer";
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
  dialogues: dialoguesReducer,
  profilePage: profileReducer,
});

let store = createStore(reducers);

export default store;