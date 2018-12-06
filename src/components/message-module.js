import React from 'react'

const MessageModule = (props) => {
  const { message } = props

  return (
    <div className="message-module">
      <div className="message">{message}</div>
    </div>
  )
}

export default MessageModule
