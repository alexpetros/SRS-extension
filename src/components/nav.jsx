import React from 'react'
import Button from 'react-bootstrap/lib/Button'

export default function NavBar(props) {
  const { name, onClick } = props

  return (
    <div className="nav">
      {name}
      <Button
        bsStyle="info"
        className="login-button"
        onClick={onClick}>
          Login
      </Button>
    </div>

  )
}
