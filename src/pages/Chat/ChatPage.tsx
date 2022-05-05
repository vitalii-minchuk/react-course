import React, { useEffect, useState } from "react"
import s from "./ChatPage.module.css"

const photo: string = "https://pngset.com/images/the-team-aone-group-holdings-ltd-circle-user-icon-svg-text-symbol-number-disk-transparent-png-2898374.png"

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = () => {
  return (
    <>
      <h2 className={s.title}>chat</h2>
      <Chat />
    </>
  )
}

const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    const closeHandler = () => {
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      ws?.removeEventListener("close", closeHandler)
      ws?.close()
      ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
      ws.addEventListener("close", closeHandler)
      setWsChannel(ws)
    }

    createChannel()

    return() => {
      ws.removeEventListener("close", closeHandler)
      ws.close()
    }
  }, [])

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    wsChannel?.addEventListener("message", messageHandler)

    return () => {
      wsChannel?.removeEventListener("message", messageHandler)
    }
  }, [wsChannel])

  return (
    <div style={{ height: "350px", overflow: "auto", border: "1px solid #999", padding: "10px" }}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

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
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState("")
  const [isReady, setIsReady] = useState<"pending" | "ready">("pending")

  useEffect(() => {
    let openHandler = () => {
      setIsReady("ready")
    }

    wsChannel?.addEventListener("open", openHandler)

    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel?.send(message)
    setMessage("")
  }

  return (
    <div className={s.addMessage}>
      <textarea className={s.textarea} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <button
        disabled={wsChannel === null && isReady !== "ready"}
        className={s.btn}
        onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatPage