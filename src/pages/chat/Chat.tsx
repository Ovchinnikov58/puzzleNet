import React, { FC, useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WS_CHANNEL } from '../../utils/constants'

const Chat: FC = (): JSX.Element => {
  const [messageHistory, setMessageHistory] = useState([] as Array<MessageEvent | null>)

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_CHANNEL)

  const handleClickSendMessage = useCallback(() => sendMessage(`[1, hello]`), [])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  useEffect(() => {
    setMessageHistory([...messageHistory, lastMessage])
  }, [lastMessage])

  return (
    <div className="chat">
      <button type="button" onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send Hello
      </button>
      <br />
      <span>The WebSocket is currently {connectionStatus}</span>
      <br />
      <ul>
        {messageHistory.map((message) => (
          <div key={message?.data + Math.random()}>
            <span>{message?.data}</span>
            <br />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Chat
