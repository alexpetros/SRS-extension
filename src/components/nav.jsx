import React from 'react'
import Button from 'react-bootstrap/lib/Button'

export default function NavBar(props) {
  const { username, onLoginClick, onDecksClick } = props
  return (
    <div className="nav">

      <div className="nav-left-side">
        <Button
          bsStyle="info"
          className="decks-button"
          onClick={onDecksClick}>
          Decks
        </Button>
      </div>

      <div className="nav-right-side">
        {username}
        <Button
          bsStyle="info"
          className="login-button"
          onClick={onLoginClick}>
          {username ? 'Logout' : 'Login'}
        </Button>
      </div>

    </div>

  )
}
