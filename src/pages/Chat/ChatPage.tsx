import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageType } from "../../api/chat-api"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import { AppStateType } from "../../redux/redux-store"
// @ts-ignore
import s from "./ChatPage.module.css"

const photo: string = "https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png"

const ChatPage: React.FC = () => {
  return (
    <>
      <h2 className={s.title}>chat</h2>
      <Chat />
    </>
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === "error" && <div>Some error. Please refresh the page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  )
}

const Messages: React.FC<{}> = ({ }) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if(isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <div onScroll={scrollHandler} style={{ height: "350px", overflow: "auto", border: "1px solid #999", padding: "10px" }}>
      {messages.map((m, index) => <Message key={m.id} message={m} />)}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {

  return (
    <>
      <div>
        <img style={{ width: "50px", borderRadius: "50%", marginRight: "20px" }} src={message.photo != null ? message.photo : photo} alt="avatar" />
        <b>{message.userName}</b>
      </div>
      <p>{message.message}</p>
      <hr />
    </>
  )
})

const AddMessageForm: React.FC<{}> = ({ }) => {
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage("")
  }

  return (
    <div className={s.addMessage}>
      <textarea className={s.textarea} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <button
        disabled={status !== "ready"}
        className={s.btn}
        onClick={sendMessageHandler}>Send</button>
    </div>
  )
}

export default ChatPage