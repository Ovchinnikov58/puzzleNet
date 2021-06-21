import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { TextField, CircularProgress } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { WS_CHANNEL } from '../../utils/constants'
import { AuthState, Message, RootState } from '../../utils/types'
import './chat.scss'

const Chat: FC = (): JSX.Element => {
  const [messageHistory, setMessageHistory] = useState([] as Array<Message | null>)
  const [messageText, setMessageText] = useState('')
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_CHANNEL)
  const { id, user } = useSelector((s: RootState): AuthState => s.auth)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  useEffect(() => {
    const mesObj = lastMessage ? JSON.parse(lastMessage?.data) : null
    setMessageHistory([...messageHistory, mesObj])
  }, [lastMessage])

  useEffect(() => {
    const el = document.querySelector('.chat__textarea')
    if (el) el.scrollTop = 9999
  }, [messageHistory])

  useEffect(() => {
    // if (connectionStatus === 'Open') toast('Соединение установлено', { type: 'success' })
    if (connectionStatus === 'Closed') toast('Соединение не установлено', { type: 'error' })
  }, [connectionStatus])

  return (
    <div className="chat">
      {/* <span>The WebSocket is {connectionStatus}</span> */}
      {connectionStatus === 'Connecting' ? <CircularProgress /> : null}
      <div className="chat__textarea">
        <ul className="chat__message-list">
          {messageHistory.map((message) => (
            <>
              {message ? (
                <li key={Math.random()} className={clsx('chat__message', id === message?.id && 'chat__message_self')}>
                  {message?.user}: {message?.message}
                </li>
              ) : null}
            </>
          ))}
        </ul>
      </div>
      <div className="chat__input-block">
        <TextField
          id="messageText"
          label="Текст сообщения:"
          className="chat__input"
          variant="outlined"
          autoFocus
          required
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          className="chat__sendBtn"
          type="button"
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          <SendIcon className="sendIcon" />
        </button>
      </div>
    </div>
  )

  function handleClickSendMessage() {
    if (messageText) sendMessage(`{"id": ${id}, "user": "${user}", "message": "${messageText}"}`)
    setMessageText('')
  }
}

export default Chat
