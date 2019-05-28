import React from 'react'
import Button from 'react-bootstrap/lib/Button'

// move these to a separate constants file later
const LOGON_MODULE = 'logon'
const DECKS_MODULE = 'options'
// const CARD_MODULE = 'card'

export default function NavBar(props) {
  const { username, onLoginClick, onDecksClick, currentView } = props
  const hiddenClass = currentView === LOGON_MODULE ? 'hidden' : ''

  return (
    <div className="nav">

      <div className="nav-left-side">
        <Button
          bsStyle="info"
          className={`decks-button ${hiddenClass}`}
          onClick={onDecksClick}>
          {currentView === DECKS_MODULE ? 'Cards' : 'Decks'}
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
