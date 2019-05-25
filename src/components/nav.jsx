import React from 'react'
import Button from 'react-bootstrap/lib/Button'

export default function NavBar(props) {
  const { username, onClick } = props
  return (
    <div className="nav">
      {username}
      <Button
        bsStyle="info"
        className="login-button"
        onClick={onClick}>
        {username ? 'Logout' : 'Login'}
      </Button>
    </div>

  )
}
