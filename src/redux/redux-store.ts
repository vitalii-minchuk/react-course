import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import authReducer from "./auth-reducer"
import dialoguesReducer from "./dialogues-reducer"
import profileReducer from "./profile-reducer"
import usersReducer from "./users-reducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

let rootReducer = combineReducers({
  dialogues: dialoguesReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store

export default store